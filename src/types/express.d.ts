declare namespace Express {
  interface Response {
    locals: {
      user?: {
        _id: string;
      };
    };
  }
}
