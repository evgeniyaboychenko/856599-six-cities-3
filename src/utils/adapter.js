const adaptOffer = (initialStructure) => {
  return (
    {
      id: initialStructure.id,
      cityLocation: {
        coordinates: [initialStructure.city.location.latitude, initialStructure.city.location.longitude],
        zoom: initialStructure.city.location.zoom},
      cityName: initialStructure.city.name,
      name: initialStructure.title,
      rating: initialStructure.rating,
      price: initialStructure.price,
      type: initialStructure.type,
      isPremium: initialStructure.is_premium,
      isFavorite: initialStructure.is_favorite,
      descriptions: initialStructure.description,
      photos: initialStructure.images,
      previewImage: initialStructure.preview_image,
      countRooms: initialStructure.bedrooms,
      maxGuests: initialStructure.max_adults,
      appliances: initialStructure.goods,
      coordinates: [initialStructure.location.latitude, initialStructure.location.longitude],
      zoom: initialStructure.location.zoom,
      owner: {
        avatar: initialStructure.host.avatar_url,
        id: initialStructure.host.id,
        name: initialStructure.host.name,
        isSuper: initialStructure.host.is_pro,
      },
    });
};

export const adaptOffers = (loadedOffers) => {
  return loadedOffers.map((item) => adaptOffer(item));
};

export const adaptCity = (offers) => {
  const cities = [];
  offers.slice().reduce((city, item) => {
    if (city.indexOf(item.cityName) === -1) {
      city.push(item.cityName);
      cities.push({name: item.cityName,
        coordinatesCity: item.cityLocation.coordinates,
        zoom: item.cityLocation.zoom}
      );
    }
    return city;
  }, []);
  return cities;
};

const adaptComment = (initialStructure) => {
  return (
    {
      id: initialStructure.id,
      text: initialStructure.comment,
      date: initialStructure.date,
      rating: initialStructure.rating,
      avatar: initialStructure.user.avatar_url,
      idUser: initialStructure.user.id,
      name: initialStructure.user.name,
      isPro: initialStructure.user.is_pro,
    });
};
export const adaptComments = (loadedComments) => {
  return loadedComments.map((item) => adaptComment(item));
};

export const adaptUser = (initialStructure) => {
  return (
    {
      id: initialStructure.id,
      email: initialStructure.email,
      avatar: initialStructure.avatar_url,
      name: initialStructure.name,
      isPro: initialStructure.is_pro,
    }
  );
};

