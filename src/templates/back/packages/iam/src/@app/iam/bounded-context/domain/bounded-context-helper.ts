import { ICommandBus, SeederBoundedContext } from '@aurorajs.dev/core';
import { CreateBoundedContextsCommand } from '../application/create/create-bounded-contexts.command';

export class BoundedContextHelper
{
    static async createBoundedContexts(
        commandBus: ICommandBus,
        boundedContexts: SeederBoundedContext[],
    ): Promise<void>
    {
        // insert bounded contexts
        await commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts));
    }
}