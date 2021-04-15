import { InternalError } from "./InternalErrors";

export class ProcessingInternalError extends InternalError {

    constructor(message: string) {
      super(`Unexpected error during  processing: ${message}`);
      
    }
}