export interface ErrorI {
  error: {
    data: {
      error: string;
      status: number | string;
    };
  };
}
