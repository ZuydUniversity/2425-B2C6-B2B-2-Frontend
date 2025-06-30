import * as EitherModule from "fp-ts/Either";

export abstract class Controller<T> {
  protected static BASE_URL: string;

  public abstract getAll(): EitherModule.Either<string, T[]>;
  public abstract getOneById(id: number): EitherModule.Either<string, T>;
  public abstract create(model: T): EitherModule.Either<string, T>;
  public abstract update(model: T): EitherModule.Either<string, T>;
  public abstract delete(model: T): EitherModule.Either<string, T>;
}
