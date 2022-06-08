import
{
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector : '[auDecimal]',
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DecimalDirective),
            multi      : true,
        },
    ],
})
export class DecimalDirective implements OnChanges, OnInit
{
    private hasDecimalPoint = false;
    private hasNegativeSign = false;
    private navigationKeys = [
        // 'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste',
    ];

    @Input() integerNumberAmount: number = null;
    @Input() decimalNumberAmount: number = null;

    @Input() decimal = true;
    @Input() decimalSeparator = '.';
    @Input() allowNegatives = false;
    @Input() allowPaste = true;
    @Input() negativeSign = '-';
    @Input() min = -Infinity;
    @Input() max = Infinity;
    @Input() pattern?: string | RegExp;
    private regex: RegExp | null = null;
    inputElement: HTMLInputElement;

    private _value: string | null;

    constructor(public el: ElementRef)
    {
        this.inputElement = el.nativeElement;
    }

    @Input('value')
    set value(val)
    {
        this._value = val;
    }

    get value(): string | null
    {
        return this._value;
    }

    _onChange(value: any): void
    {/**/}

    writeValue(value: any): void
    {
        this._value = value;
    }

    registerOnChange(fn: (value: any) => void): void
    {
        this._onChange = fn;
    }

    registerOnTouched(): void
    {/**/}

    ngOnInit(): void
    {
        this.regex = new RegExp(`^\\d{1,${this.integerNumberAmount ?? 99}}(\\${this.decimalSeparator}\\d{1,${this.decimalNumberAmount ?? 99}})?$`);

        if (this.integerNumberAmount && this.decimalNumberAmount && this.decimal)
        {
            this.inputElement.maxLength = Number(this.integerNumberAmount) + Number(this.decimalNumberAmount) + (this.decimal ? 1 : 0);
        }
        else if (this.integerNumberAmount && !this.decimalNumberAmount && !this.decimal)
        {
            this.inputElement.maxLength = Number(this.integerNumberAmount);
        }
        else if (this.integerNumberAmount && this.decimalNumberAmount && !this.decimal)
        {
            // this means the component is not set up right.
            // it will limit maxlength on copy/paste event, but also trigger
            // a console warning
            this.inputElement.maxLength = Number(this.integerNumberAmount);
        }

        this.inputElement.autocomplete = 'off';

        // error warnings if directive is not setup correctly
        if (this.decimalNumberAmount && !this.decimal)
        {
            console.warn('A maximum number of decimal digits was set but the component seems to have decimals disabled. Please check');
        }
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['pattern'])
        {
            this.regex = this.pattern ? RegExp(this.pattern) : null;
        }

        if (changes['min'])
        {
            const maybeMin = Number(this.min);
            this.min = isNaN(maybeMin) ? -Infinity : maybeMin;
        }

        if (changes['max'])
        {
            const maybeMax = Number(this.max);
            this.max = isNaN(maybeMax) ? Infinity : maybeMax;
        }
    }

    @HostListener('beforeinput', ['$event'])
    onBeforeInput(e: InputEvent): any
    {
        if (isNaN(Number(e.data)))
        {
            if (
                e.data === this.decimalSeparator ||
                (e.data === this.negativeSign && this.allowNegatives)
            )
            {
                return; // go on
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): any
    {
        if (
            this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
            ((e.key === 'a' || e.code === 'KeyA') && e.ctrlKey === true) || // Allow: Ctrl+A
            ((e.key === 'c' || e.code === 'KeyC') && e.ctrlKey === true) || // Allow: Ctrl+C
            ((e.key === 'v' || e.code === 'KeyV') && e.ctrlKey === true) || // Allow: Ctrl+V
            ((e.key === 'x' || e.code === 'KeyX') && e.ctrlKey === true) || // Allow: Ctrl+X
            ((e.key === 'a' || e.code === 'KeyA') && e.metaKey === true) || // Allow: Cmd+A (Mac)
            ((e.key === 'c' || e.code === 'KeyC') && e.metaKey === true) || // Allow: Cmd+C (Mac)
            ((e.key === 'v' || e.code === 'KeyV') && e.metaKey === true) || // Allow: Cmd+V (Mac)
            ((e.key === 'x' || e.code === 'KeyX') && e.metaKey === true) // Allow: Cmd+X (Mac)
        )
        {
            // let it happen, don't do anything
            return;
        }

        let newValue = '';

        if (this.decimal && e.key === this.decimalSeparator)
        {
            newValue = this.forecastValue(e.key);
            if (newValue.split(this.decimalSeparator).length > 2)
            {
                // has two or more decimal points
                e.preventDefault();
                return;
            }
            else
            {
                this.hasDecimalPoint = newValue.indexOf(this.decimalSeparator) > -1;
                return; // Allow: only one decimal point
            }
        }

        if (e.key === this.negativeSign && this.allowNegatives)
        {
            newValue = this.forecastValue(e.key);
            if (
                newValue.charAt(0) !== this.negativeSign ||
                newValue.split(this.negativeSign).length > 2
            )
            {
                e.preventDefault();
                return;
            }
            else
            {
                this.hasNegativeSign = newValue.split(this.negativeSign).length > -1;
                return;
            }
        }

        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || isNaN(Number(e.key)) && e.key !== 'Backspace')
        {
            e.preventDefault();
            return;
        }

        newValue = newValue || this.forecastValue(e.key);

        // check the input pattern RegExp
        if (this.regex)
        {
            // if last char is decimal separator, it should be removed and not taken into account
            if (newValue.split('').slice(-1).join('') === this.decimalSeparator)
            {
                newValue = newValue.split('').slice(0, -1).join('');
            }

            // lastly, test to check if pattern matches
            if (newValue !== '')
            {
                if (!this.regex.test(newValue))
                {
                    e.preventDefault();
                    return;
                }
            }
        }

        // if no value, nullify
        if (newValue !== '')
        {
            const newNumber = Number(newValue.replace(',', '.'));
            if (newNumber > this.max || newNumber < this.min)
            {
                e.preventDefault();
            }

            this._onChange(newNumber);
        }
        else
        {
            this._onChange('');
        }

    }

    @HostListener('paste', ['$event'])
    onPaste(event: any): void
    {
        if (this.allowPaste === true)
        {
            let pastedInput: string = '';
            if ((window as { [key: string]: any; })['clipboardData'])
            {
                // Browser is IE
                pastedInput = (window as { [key: string]: any; })[
                    'clipboardData'
                ].getData('text');
            }
            else if (event.clipboardData && event.clipboardData.getData)
            {
                // Other browsers
                pastedInput = event.clipboardData.getData('text/plain');
            }

            this.pasteData(pastedInput);
            event.preventDefault();
        }
        else
        {
            // this prevents the paste
            event.preventDefault();
            event.stopPropagation();
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void
    {
        const textData = event.dataTransfer?.getData('text') ?? '';
        this.inputElement.focus();
        this.pasteData(textData);
        event.preventDefault();
    }

    private pasteData(pastedContent: string): void
    {
        const sanitizedContent = this.sanitizeInput(pastedContent);
        if (
            sanitizedContent.includes(this.negativeSign) &&
            this.hasNegativeSign &&
            !this.getSelection().includes(this.negativeSign)
        )
        {
            return;
        }
        const pasted = document.execCommand('insertText', false, sanitizedContent);
        if (!pasted)
        {
            if (this.inputElement.setRangeText)
            {
                const { selectionStart: start, selectionEnd: end } = this.inputElement;
                this.inputElement.setRangeText(
                    sanitizedContent,
                    start ?? 0,
                    end ?? 0,
                    'end',
                );
                // Angular's Reactive Form relies on "input" event, but on Firefox, the setRangeText method doesn't trigger it
                // so we have to trigger it ourself.
                if (
                    typeof (window as { [key: string]: any; })['InstallTrigger'] !==
                    'undefined'
                )
                {
                    this.inputElement.dispatchEvent(
                        new Event('input', { cancelable: true }),
                    );
                }
            }
            else
            {
                // Browser does not support setRangeText, e.g. IE
                this.insertAtCursor(this.inputElement, sanitizedContent);
            }
        }
        if (this.decimal)
        {
            this.hasDecimalPoint =
                this.inputElement.value.indexOf(this.decimalSeparator) > -1;
        }
        this.hasNegativeSign =
            this.inputElement.value.indexOf(this.negativeSign) > -1;
    }

    // The following 2 methods were added from the below article for browsers that do not support setRangeText
    // https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
    private insertAtCursor(myField: HTMLInputElement, myValue: string): void
    {
        const startPos = myField.selectionStart ?? 0;
        const endPos = myField.selectionEnd ?? 0;

        myField.value =
            myField.value.substring(0, startPos) +
            myValue +
            myField.value.substring(endPos, myField.value.length);

        const pos = startPos + myValue.length;
        myField.focus();
        myField.setSelectionRange(pos, pos);

        this.triggerEvent(myField, 'input');
    }

    private triggerEvent(el: HTMLInputElement, type: string): void
    {
        if ('createEvent' in document)
        {
            // modern browsers, IE9+
            const e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        }
    }
    // end stack overflow code

    private sanitizeInput(input: string): string
    {
        let result = '';
        let regex;
        if (this.decimal && this.isValidDecimal(input))
        {
            regex = new RegExp(
                `${this.getNegativeSignRegExp()}[^0-9${this.decimalSeparator}]`,
                'g',
            );
        }
        else
        {
            regex = new RegExp(`${this.getNegativeSignRegExp()}[^0-9]`, 'g');
        }
        result = input.replace(regex, '');

        const maxLength = this.inputElement.maxLength;
        if (maxLength > 0)
        {
            // the input element has maxLength limit
            const allowedLength =
                maxLength -
                this.inputElement.value.length +
                (result.includes(`${this.negativeSign}`) ? 1 : 0);
            result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
        }
        return result;
    }

    private getNegativeSignRegExp(): string
    {
        return this.allowNegatives &&
            (!this.hasNegativeSign || this.getSelection().includes(this.negativeSign))
            ? `(?!^${this.negativeSign})`
            : '';
    }

    private isValidDecimal(string: string): boolean
    {
        if (!this.hasDecimalPoint)
        {
            return string.split(this.decimalSeparator).length <= 2;
        }
        else
        {
            // the input element already has a decimal separator
            const selectedText = this.getSelection();
            if (selectedText && selectedText.indexOf(this.decimalSeparator) > -1)
            {
                return string.split(this.decimalSeparator).length <= 2;
            }
            else
            {
                return string.indexOf(this.decimalSeparator) < 0;
            }
        }
    }

    private getSelection(): string
    {
        return this.inputElement.value.substring(
            this.inputElement.selectionStart ?? 0,
            this.inputElement.selectionEnd ?? 0,
        );
    }

    private forecastValue(key: string): string
    {
        const selectionStart = this.inputElement.selectionStart ?? 0;
        const selectionEnd = this.inputElement.selectionEnd ?? 0;
        const oldValue = this.inputElement.value;

        if (key === 'Backspace')
        {
            if (oldValue.length === 1) return '';
            return (
                oldValue.replace(oldValue.substring(selectionEnd - 1), '')
            );
        }
        else
            return (
                oldValue.substring(0, selectionStart) +
            key +
            oldValue.substring(selectionEnd)
            );
    }
}