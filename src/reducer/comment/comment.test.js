import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operation} from './comment.js';
import {ActionType as ActionTypeError} from '../user/user.js';

const api = createAPI(() => {});

const DESCRIPTIONS = [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`, `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`];
const AVATARS = [`avatar-angelina.jpg`, `avatar-max.jpg`];
const NAMES = [`Angelina`, `Max`, `Kate`, `Pol`, `Mike`];

const state = {
  isSubmitForm: false,
  comments: []
};

const serverComments = [{
  "comment": DESCRIPTIONS[0],
  "date": `2020-03-29T18:07:19.382Z`,
  "id": 1,
  "rating": 2,
  "user": {
    "avatar_url": AVATARS[0],
    "id": 1,
    "is_pro": false,
    "name": NAMES[0]
  }
}
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    isSubmitForm: false,
    comments: [],
  });
});


it(`Reducer should load comments`, () => {
  expect(reducer(state, {
    type: ActionType.LOAD_COMMENTS,
    payload: serverComments,
  })).toEqual({
    isSubmitForm: false,
    comments: [{
      id: 1,
      avatar: AVATARS[0],
      name: NAMES[0],
      rating: 2,
      text: DESCRIPTIONS[0],
      date: `2020-03-29T18:07:19.382Z`,
      idUser: 1,
      isPro: false,
    }]
  });
});

it(`Reducer should change sort offer list`, () => {
  expect(reducer(state, {
    type: ActionType.SET_IS_FORM_SUBMIT,
    payload: true,
  })).toEqual({
    isSubmitForm: true,
    comments: []
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const idHotel = 1;
    const commentsLoader = Operation.loadComments(idHotel);

    apiMock
      .onGet(`/comments/` + idHotel)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /comments/:idHotel for post`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const idHotel = 1;
    const comment = {
      comment: `The Best Comment`,
      rating: 3,
    };
    const offersLoader = Operation.submitComment(comment, idHotel);

    apiMock
      .onPost(`/comments/` + idHotel, {
        comment: comment.comment,
        rating: comment.rating,
      })
      .reply(200, serverComments);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_IS_FORM_SUBMIT,
          payload: false
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: serverComments
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionTypeError.SET_LOADING_ERROR,
          payload: ``
        });
      });
  });
});
