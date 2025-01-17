import { SourceFile } from 'ts-morph';

export class ImportDriver
{
    /**
     * Create import in file
     *
     * @param sourceFile
     * @param modules
     * @param path
     * @return void
     */
    public static createImportItems(
        sourceFile: SourceFile,
        path: string,
        items: string[],
    ): void
    {
        const itemsToImport: string[] = ImportDriver.getUniqueImportItems(sourceFile, items);
        const importPaths: string[]   = ImportDriver.getImportPaths(sourceFile);

        if (itemsToImport.length === 0) return;

        // if exist path add item to import
        if (importPaths.includes(path))
        {
            // check this import not exist yet
            const importElement = sourceFile.getImportDeclaration(path);
            const itemsToImportChecked: string[] = [];
            for (const itemToImport of itemsToImport)
            {
                let existItem = false;
                for (const importedElement of importElement?.getNamedImports() ? importElement?.getNamedImports() : [])
                {
                    if (importedElement.getName() === itemToImport) existItem = true;
                }

                if (!existItem) itemsToImportChecked.push(itemToImport);
            }

            // add import after check that is not repeated
            if (itemsToImportChecked.length > 0) importElement?.addNamedImports(itemsToImportChecked);
        }
        // create new import
        else
        {
            sourceFile.addImportDeclaration({
                namedImports   : itemsToImport,
                moduleSpecifier: path,
            });
        }
    }

    /**
     * From the items array, only non-repeating items are returned.
     *
     * @param sourceFile
     * @param moduleNames
     * @return string[]
     */
    public static getUniqueImportItems(sourceFile: SourceFile, items: string[]): string[]
    {
        // get import to avoid duplicities
        const imports = sourceFile.getImportDeclarations();

        // get names imported
        const itemsImported = new Set(imports.flatMap(i => i.getNamedImports().map(j => j.getName())));

        // filter only items where is not imported
        return items.filter(item => !itemsImported.has(item));
    }

    /**
     * Return import paths from source
     *
     * @param sourceFile
     * @return string[]
     */
    public static getImportPaths(sourceFile: SourceFile): string[]
    {
        const imports = sourceFile.getImportDeclarations();
        const paths: string[] = [];
        for (const importObj of imports)
        {
            paths.push(importObj.getModuleSpecifier().getLiteralValue());
        }

        return paths;
    }

    /**
     * Return import items from source
     *
     * @param sourceFile
     * @return string[]
     */
    public static getImportedDeclarations(sourceFile: SourceFile): string[]
    {
        const imports = sourceFile.getImportDeclarations();
        let declarations: string[] = [];
        for (const importObj of imports)
        {
            declarations = [...declarations, ...importObj.getNamedImports().map(i => i.getName())];
        }

        return declarations;
    }

    public static hasImportDeclarations(sourceFile: SourceFile, declaration: string): boolean
    {
        const importedDeclarations = ImportDriver.getImportedDeclarations(sourceFile);

        return importedDeclarations.includes(declaration);
    }
}
