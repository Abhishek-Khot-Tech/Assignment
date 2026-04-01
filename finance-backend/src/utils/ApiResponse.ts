import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = StatusCodes.OK,
    meta?: PaginationMeta
  ) {
    const response: any = {
      success: true,
      message,
      data,
    };
    if (meta) {
      response.meta = meta;
    }
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message = 'Created successfully') {
    return ApiResponse.success(res, data, message, StatusCodes.CREATED);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Fetched successfully'
  ) {
    return ApiResponse.success(res, data, message, StatusCodes.OK, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  }
}
