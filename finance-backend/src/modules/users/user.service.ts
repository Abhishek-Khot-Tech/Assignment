import { User } from './user.model';
import { ApiError } from '../../utils/ApiError';
import { getSkip, PaginationOptions } from '../../utils/pagination';
import { UpdateUserInput } from './user.schema';

class UserService {
  async findAll(pagination: PaginationOptions) {
    const { page, limit, sortBy, sortOrder } = pagination;
    const skip = getSkip(page, limit);

    const [users, total] = await Promise.all([
      User.find()
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .select('-password'),
      User.countDocuments(),
    ]);

    return { users, total };
  }

  async findById(id: string) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }

  async update(id: string, data: UpdateUserInput) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user;
  }

  async softDelete(id: string) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    ).select('-password');

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user;
  }
}

export const userService = new UserService();
