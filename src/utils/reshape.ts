import { formatNumberWithCommas } from ".";

export const transformAdminUserRegistrations = (data: any) => {
  let newData: any[] = [];

  Array.from(data, (item: any) => {
    const {
      activationCode,
      activationExpiry,
      bio,
      doc,
      emailActivatedAt,
      hasEmailVerified,
      hasAcceptTerms,
      password,
      statusUpdatedAt,
      statusUpdatedBy,
      step,
      updatedAt,
      ...rest
    } = item;

    newData.push({ ...rest });
  });

  return newData;
};

export const transformPackagesGridData = (data: any) => {
  let newData: any[] = [];

  Array.from(data, (item: any) => {
    const { currency, price, category, ...rest } = item;

    newData.push({
      ...rest,
      price:
        price === undefined
          ? `${currency} 0`
          : `${currency} ${formatNumberWithCommas(price)}`,
      category: category.name,
    });
  });

  return newData;
};

export const transformStaffGridData = (data: any) => {
  let newData: any[] = [];

  Array.from(data, (item: any) => {
    const { name, email, accessLevel, ...rest } = item;

    newData.push({
      ...rest,
      name,
      email,
      accessLevel,
    });
  });

  return newData;
};

export const transformApplicationsGridData = (data: any) => {
  let newData: any[] = [];

  console.log(data);

  Array.from(data, (item: any) => {
    console.log(item);
    const { currency, title, price, package: pkg, category, ...rest } = item;

    newData.push({
      ...rest,
      amount:
        price === undefined
          ? `${pkg.currency} 0`
          : `${pkg.currency} ${formatNumberWithCommas(price)}`,
      category: pkg.category.name,
      name: pkg.title,
    });
  });

  return newData;
};

export const transformPackageCards = (data: any) => {
  let newData: any[] = [];

  console.log(data);

  Array.from(data, (item: any) => {
    const { category, ...rest } = item;

    newData.push({
      category: category.name,
      ...rest,
    });
  });

  return newData;
};

export const transformCategoryPackages = (data: any) => {
  let newData: any[] = [];

  Array.from(data, (item: any) => {
    const { price, currency, title, category, attachments, status, _id } = item;

    newData.push({
      _id,
      price: `${currency}${price}`,
      slug: category.slug,
      title,
      category: category.name,
      image: attachments[0],
      status,
    });
  });

  return newData;
};

export const transformHomePagePackages = (data: any) => {
  let newData: any[] = Array.from(data, (item: any) => {
    const slug = item.category.slug;
    const category = item.category.name;
    const packages = item.packages;

    let newPkgs = packages?.map((pkg: any) => {
      const {
        _id,
        discount,
        currency,
        price,
        questions,
        regions,
        title,
        status,
        attachments,
      } = pkg;

      return {
        _id,
        slug,
        category,
        discount,
        price: `${currency} ${price}`,
        questions,
        regions,
        title,
        status,
        image: attachments[0],
      };
    });

    return newPkgs;
  });

  return newData;
};
