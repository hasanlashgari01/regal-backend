export enum AuthMessage {
  TryAgain = 'مجددا تلاش کنید',
  ExpiresCode = 'کد منقضی شده',
  SentCode = 'کد ارسال شد',
  UsedCode = 'کد قبلا استفاده شده',
  LoginAgain = 'مجددا لاگین کنید',
  LoggedIn = 'وارد حساب کاربری خود شدید',
  LoginRequired = 'وارد حساب کاربری خود شوید',
  NotAccess = 'دسترسی شما برای انجام این درخواست کافی نیست',
}

export enum BadRequestMessage {
  File = 'فایلی ارسال نشده است',
  FileName = 'فایل معتبر نیست',
}

export enum ConflictMessage {
  ExistCategorySlug = 'دسته‌بندی با این slug وجود دارد',
  ExistMaterialSlug = 'جنس لباس با این slug وجود دارد',
  ExistColorCode = 'رنگ مورد نظر وجود دارد',
  ExistDesign = 'طرح وجود دارد',
}

export enum PublicMessage {}

export enum NotFoundMessage {
  User = 'کاربر یافت نشد',
  Category = 'دسته بندی یافت نشد',
  Material = 'جنس لباس یافت نشد',
  Color = 'رنگ مورد نظر یافت نشد',
  Design = 'طرح مورد نظر یافت نشد',
}

export enum ValidationMessage {}

export enum InternalServerMessage {
  File = 'خطا در آپلود تصویر',
}

export enum SuccessMessage {
  CreateCategory = 'دسته بندی با موفقیت ساخته شد',
  UpdateCategory = 'دسته بندی با موفقیت آپدیت شد',
  DeleteCategory = 'دسته بندی با موفقیت حذف شد',
  CreateMaterial = 'جنس لباس با موفقیت ساخته شد',
  UpdateMaterial = 'جنس لباس با موفقیت آپدیت شد',
  DeleteMaterial = 'جنس لباس با موفقیت حذف شد',
  CreateColor = 'رنگ با موفقیت ساخته شد',
  UpdateColor = 'رنگ با موفقیت آپدیت شد',
  DeleteColor = 'رنگ با موفقیت حذف شد',
  CreateDesign = ' طرح با موفقیت ساخته شد',
  UpdateDesign = ' طرح با موفقیت آپدیت شد',
  DeleteDesign = ' طرح با موفقیت حذف شد',
}
