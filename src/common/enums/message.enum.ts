export enum AuthMessage {
  TryAgain = 'مجددا تلاش کنید',
  ExpiresCode = 'کد منقضی شده',
  SentCode = 'کد ارسال شد',
  UsedCode = 'کد قبلا استفاده شده',
  LoginAgain = 'مجددا لاگین کنید',
  LoggedIn = 'وارد حساب کاربری خود شدید',
  LoginRequired = 'وارد حساب کاربری خود شوید',
}

export enum BadRequestMessage {
  File = 'فایلی ارسال نشده است',
  FileName = 'فایل معتبر نیست',
}

export enum ConflictMessage {
  ExistCategorySlug = 'دسته‌بندی با این slug وجود دارد',
}

export enum PublicMessage {}

export enum NotFoundMessage {
  User = 'کاربر یافت نشد',
  Category = 'دسته بندی یافت نشد',
}

export enum ValidationMessage {}

export enum InternalServerMessage {
  File = 'خطا در آپلود تصویر',
}

export enum SuccessMessage {
  CreateCategory = 'دسته بندی با موفقیت ساخته شد',
  UpdateCategory = 'دسته بندی با موفقیت آپدیت شد',
  DeleteCategory = 'دسته بندی با موفقیت حذف شد',
}
