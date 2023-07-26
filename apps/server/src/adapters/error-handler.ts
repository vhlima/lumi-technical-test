import { ServerError } from "@/errors";

export class ErrorHandlerAdapter {
  public handle(error: unknown) {
    if (error instanceof ServerError) {
      return {
        message: error.message,
        code: error.code,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        code: 400,
      };
    }

    return {
      message: "Unexpected error occurred",
      code: 400,
    };
  }
}

export const errorHandler = new ErrorHandlerAdapter();