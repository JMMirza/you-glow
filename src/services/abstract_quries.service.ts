import { Model, FilterQuery } from 'mongoose';

export async function findAll(
  model: Model<any>,
  limit: number,
  search: string,
  page: number,
  fields: any,
  filter: FilterQuery<any>,
  projection: any,
  populate: any,
  sort?: any,
): Promise<any> {
  const query = search
    ? fields.length > 0
      ? {
          $and: [
            filter,
            {
              $or: fields.map((field) => ({
                [field]: { $regex: search, $options: 'i' },
              })),
            },
          ],
        }
      : filter
    : filter;
  const count = await model.countDocuments(query);
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const skip = Math.max(0, (currentPage - 1) * limit);
  const finalSorting = sort ? sort : { createdAt: -1 };
  const results = await model
    .find(query)
    .populate(populate)
    .sort(finalSorting)
    .skip(skip)
    .limit(limit)
    .select(projection)
    .exec();

  return { results, totalDocuments: count, currentPage, totalPages, limit };
}
