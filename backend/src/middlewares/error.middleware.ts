import { Request, Response, NextFunction } from 'express';

// Classe base de erro da aplicação
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 400, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Erros específicos — semântica clara no service
export class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Dados inválidos') {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflito de dados') {
    super(message, 409);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Ação não permitida') {
    super(message, 403);
  }
}

// Middleware principal
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erros conhecidos da aplicação
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // Erro de sintaxe no JSON do body
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'JSON inválido no corpo da requisição',
    });
  }

  // Erros do TypeORM
  if (err.name === 'QueryFailedError') {
    const queryError = err as any;

    // Violação de unique constraint (ex: nickname duplicado)
    if (queryError.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        status: 'error',
        statusCode: 409,
        message: 'Já existe um registro com esses dados',
      });
    }

    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Erro na operação com o banco de dados',
    });
  }

  // Erros inesperados — loga mas não expõe detalhes
  console.error('💥 Erro não tratado:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Erro interno do servidor',
  });
}