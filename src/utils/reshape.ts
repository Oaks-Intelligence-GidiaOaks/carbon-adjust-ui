export const transformAdminUserRegistrations = (data: any) => {
  let newData: any[] = [];

  Array.from(data, (item: any) => {
    const {
      activationCode,
      activationExpiry,
      address,
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
      price: `${currency}  ${price}`,
      category: category.name,
    });
  });

  return newData;
};

export const transformPackageCards = (data: any) => {
  let newData: any[] = [];

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
