import { CommonLang } from '..';
import { Observable } from 'rxjs';

export abstract class AuroraLangService
{
    /**
    * Getter for langs
    */
    abstract get langs$(): Observable<CommonLang[]>;

    abstract get(): Observable<CommonLang[]>;
}