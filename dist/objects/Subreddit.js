"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _stream = require("stream");

var _fs = require("fs");

var _helpers = require("../helpers.js");

var _errors = require("../errors.js");

var _RedditContent = _interopRequireDefault(require("./RedditContent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var api_type = 'json';
/**
 * A class representing a subreddit
 * <style> #Subreddit {display: none} </style>
 * @extends RedditContent
 * @example
 *
 * // Get a subreddit by name
 * r.getSubreddit('AskReddit')
 */

var Subreddit = class Subreddit extends _RedditContent.default {
  get _uri() {
    return "r/".concat(this.display_name, "/about");
  }

  _transformApiResponse(response) {
    if (!(response instanceof Subreddit)) {
      throw new TypeError("The subreddit /r/".concat(this.display_name, " does not exist."));
    }

    return response;
  }

  _deleteFlairTemplates(_ref) {
    var _this = this;

    var flair_type = _ref.flair_type;
    return _asyncToGenerator(function* () {
      yield _this._post({
        url: "r/".concat(_this.display_name, "/api/clearflairtemplates"),
        form: {
          api_type,
          flair_type
        }
      });
      return _this;
    })();
  }
  /**
   * @summary Deletes all of this subreddit's user flair templates
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteAllUserFlairTemplates()
   */


  deleteAllUserFlairTemplates() {
    return this._deleteFlairTemplates({
      flair_type: 'USER_FLAIR'
    });
  }
  /**
   * @summary Deletes all of this subreddit's link flair templates
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteAllLinkFlairTemplates()
   */


  deleteAllLinkFlairTemplates() {
    return this._deleteFlairTemplates({
      flair_type: 'LINK_FLAIR'
    });
  }
  /**
   * @summary Deletes one of this subreddit's flair templates
   * @param {object} options
   * @param {string} options.flair_template_id The ID of the template that should be deleted
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteFlairTemplate({flair_template_id: 'fdfd8532-c91e-11e5-b4d4-0e082084d721'})
   */


  deleteFlairTemplate(_ref2) {
    var _this2 = this;

    var flair_template_id = _ref2.flair_template_id;
    return _asyncToGenerator(function* () {
      yield _this2._post({
        url: "r/".concat(_this2.display_name, "/api/deleteflairtemplate"),
        form: {
          api_type,
          flair_template_id
        }
      });
      return _this2;
    })();
  }

  _createFlairTemplate(_ref3) {
    var _this3 = this;

    var text = _ref3.text,
        css_class = _ref3.css_class,
        _ref3$cssClass = _ref3.cssClass,
        cssClass = _ref3$cssClass === void 0 ? css_class : _ref3$cssClass,
        flair_type = _ref3.flair_type,
        _ref3$text_editable = _ref3.text_editable,
        text_editable = _ref3$text_editable === void 0 ? false : _ref3$text_editable,
        _ref3$textEditable = _ref3.textEditable,
        textEditable = _ref3$textEditable === void 0 ? text_editable : _ref3$textEditable;
    return _asyncToGenerator(function* () {
      yield _this3._post({
        url: "r/".concat(_this3.display_name, "/api/flairtemplate"),
        form: {
          api_type,
          text,
          css_class: cssClass,
          flair_type,
          text_editable: textEditable
        }
      });
      return _this3;
    })();
  }
  /**
   * @summary Creates a new user flair template for this subreddit
   * @param {object} options
   * @param {string} options.text The flair text for this template
   * @param {string} [options.cssClass=''] The CSS class for this template
   * @param {boolean} [options.textEditable=false] Determines whether users should be able to edit their flair text
   * when it has this template
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').createUserFlairTemplate({text: 'Some Flair Text', cssClass: 'some-css-class'})
   */


  createUserFlairTemplate(options) {
    return this._createFlairTemplate(_objectSpread({}, options, {
      flair_type: 'USER_FLAIR'
    }));
  }
  /**
   * @summary Creates a new link flair template for this subreddit
   * @param {object} options
   * @param {string} options.text The flair text for this template
   * @param {string} [options.cssClass=''] The CSS class for this template
   * @param {boolean} [options.textEditable=false] Determines whether users should be able to edit the flair text of their
   * links when it has this template
   * @returns {Promise} A Promise that fulfills with this Subredit when the request is complete.
   * @example r.getSubreddit('snoowrap').createLinkFlairTemplate({text: 'Some Flair Text', cssClass: 'some-css-class'})
   */


  createLinkFlairTemplate(options) {
    return this._createFlairTemplate(_objectSpread({}, options, {
      flair_type: 'LINK_FLAIR'
    }));
  }

  _getFlairOptions() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref4.name,
        link = _ref4.link,
        is_newlink = _ref4.is_newlink;

    // TODO: Add shortcuts for this on RedditUser and Submission
    return this._post({
      url: "r/".concat(this.display_name, "/api/flairselector"),
      form: {
        name,
        link,
        is_newlink
      }
    });
  }
  /**
   * @summary Gets the flair templates for the subreddit or a given link.
   * @param {string} [linkId] The link's base36 ID
   * @returns {Promise} An Array of flair template options
   * @example
   *
   * r.getSubreddit('snoowrap').getLinkFlairTemplates('4fp36y').then(console.log)
   * // => [ { flair_css_class: '',
   * //  flair_template_id: 'fdfd8532-c91e-11e5-b4d4-0e082084d721',
   * //  flair_text_editable: true,
   * //  flair_position: 'right',
   * //  flair_text: '' },
   * //  { flair_css_class: '',
   * //  flair_template_id: '03821f62-c920-11e5-b608-0e309fbcf863',
   * //  flair_text_editable: true,
   * //  flair_position: 'right',
   * //  flair_text: '' },
   * //  ...
   * // ]
   */


  getLinkFlairTemplates() {
    var _this4 = this;

    var linkId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return _asyncToGenerator(function* () {
      var options = linkId ? {
        link: linkId
      } : {
        is_newlink: true
      };
      var res = yield _this4._getFlairOptions(options);
      return res.choices;
    })();
  }
  /**
   * @summary Gets the list of user flair templates on this subreddit.
   * @returns {Promise} An Array of user flair templates
   * @example
   *
   * r.getSubreddit('snoowrap').getUserFlairTemplates().then(console.log)
   * // => [ { flair_css_class: '',
   * //  flair_template_id: 'fdfd8532-c91e-11e5-b4d4-0e082084d721',
   * //  flair_text_editable: true,
   * //  flair_position: 'right',
   * //  flair_text: '' },
   * //  { flair_css_class: '',
   * //  flair_template_id: '03821f62-c920-11e5-b608-0e309fbcf863',
   * //  flair_text_editable: true,
   * //  flair_position: 'right',
   * //  flair_text: '' },
   * //  ...
   * // ]
   */


  getUserFlairTemplates() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this5._getFlairOptions();
      return res.choices;
    })();
  }
  /**
   * @summary Clears a user's flair on this subreddit.
   * @param {string} name The user's name
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteUserFlair('actually_an_aardvark')
   */


  deleteUserFlair(name) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      yield _this6._post({
        url: "r/".concat(_this6.display_name, "/api/deleteflair"),
        form: {
          api_type,
          name
        }
      });
      return _this6;
    })();
  }
  /**
   * @summary Gets a user's flair on this subreddit.
   * @param {string} name The user's name
   * @returns {Promise} An object representing the user's flair
   * @example
   *
   * r.getSubreddit('snoowrap').getUserFlair('actually_an_aardvark').then(console.log)
   * // => { flair_css_class: '',
   * //  flair_template_id: 'fdfd8532-c91e-11e5-b4d4-0e082084d721',
   * //  flair_text: '',
   * //  flair_position: 'right'
   * // }
   */


  getUserFlair(name) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this7._getFlairOptions({
        name
      });
      return res.current;
    })();
  }
  /**
   * @summary Sets multiple user flairs at the same time
   * @desc Due to the behavior of the reddit API endpoint that this function uses, if any of the provided user flairs are
   * invalid, reddit will make note of this in its response, but it will still attempt to set the remaining user flairs. If this
   * occurs, the Promise returned by snoowrap will be rejected, and the rejection reason will be an array containing the 'error'
   * responses from reddit.
   * @param {object[]} flairArray
   * @param {string} flairArray[].name A user's name
   * @param {string} flairArray[].text The flair text to assign to this user
   * @param {string} flairArray[].cssClass The flair CSS class to assign to this user
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example
   * r.getSubreddit('snoowrap').setMultipleUserFlairs([
   *   {name: 'actually_an_aardvark', text: "this is /u/actually_an_aardvark's flair text", cssClass: 'some-css-class'},
   *   {name: 'snoowrap_testing', text: "this is /u/snoowrap_testing's flair text", cssClass: 'some-css-class'}
   * ]);
   * // the above request gets completed successfully
   *
   * r.getSubreddit('snoowrap').setMultipleUserFlairs([
   *   {name: 'actually_an_aardvark', text: 'foo', cssClass: 'valid-css-class'},
   *   {name: 'snoowrap_testing', text: 'bar', cssClass: "this isn't a valid css class"},
   *   {name: 'not_an_aardvark', text: 'baz', cssClass: "this also isn't a valid css class"}
   * ])
   * // the Promise from the above request gets rejected, with the following rejection reason:
   * [
   *   {
   *     status: 'skipped',
   *     errors: { css: 'invalid css class `this isn\'t a valid css class\', ignoring' },
   *     ok: false,
   *     warnings: {}
   *   },
   *   {
   *     status: 'skipped',
   *     errors: { css: 'invalid css class `this also isn\'t a valid css class\', ignoring' },
   *     ok: false,
   *     warnings: {}
   *   }
   * ]
   * // note that /u/actually_an_aardvark's flair still got set by the request, even though the other two flairs caused errors.
   */


  setMultipleUserFlairs(flairArray) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      var csvLines = flairArray.map(function (item) {
        // reddit expects to receive valid CSV data, which each line having the form `username,flair_text,css_class`.
        return [item.name, item.text || item.flairText || item.flair_text || '', item.cssClass || item.css_class || item.flairCssClass || item.flair_css_class || ''].map(function (str) {
          /**
           * To escape special characters in the lines (e.g. if the flair text itself contains a comma), surround each
           * part of the line with double quotes before joining the parts together with commas (in accordance with how special
           * characters are usually escaped in CSV). If double quotes are themselves part of the flair text, replace them with a
           * pair of consecutive double quotes.
           */
          return "\"".concat(str.replace(/"/g, '""'), "\"");
        }).join(',');
      });
      /**
       * Due to an API limitation, this endpoint can only set the flair of 100 users at a time.
       * Send multiple requests if necessary to ensure that all users in the array are accounted for.
       */

      var flairChunks = yield Promise.all((0, _lodash.chunk)(csvLines, 100).map(function (flairChunk) {
        return _this8._post({
          url: "r/".concat(_this8.display_name, "/api/flaircsv"),
          form: {
            flair_csv: flairChunk.join('\n')
          }
        });
      }));
      var results = (0, _lodash.flatten)(flairChunks);
      var errorRows = results.filter(function (row) {
        return !row.ok;
      });

      if (errorRows.length) {
        throw errorRows;
      }

      return _this8;
    })();
  }
  /**
   * @summary Gets a list of all user flairs on this subreddit.
   * @param {object} options
   * @param {string} [options.name] A specific username to jump to
   * @returns {Promise} A Listing containing user flairs
   * @example
   *
   * r.getSubreddit('snoowrap').getUserFlairList().then(console.log)
   * // => Listing [
   * //  { flair_css_class: null,
   * //  user: 'not_an_aardvark',
   * //  flair_text: 'Isn\'t an aardvark' },
   * //  { flair_css_class: 'some-css-class',
   * //    user: 'actually_an_aardvark',
   * //    flair_text: 'this is /u/actually_an_aardvark\'s flair text' },
   * //  { flair_css_class: 'some-css-class',
   * //    user: 'snoowrap_testing',
   * //    flair_text: 'this is /u/snoowrap_testing\'s flair text' }
   * // ]
   */


  getUserFlairList() {
    var _this9 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._getListing({
      uri: "r/".concat(this.display_name, "/api/flairlist"),
      qs: options,
      _transform: function (response) {
        /**
         * For unknown reasons, responses from the api/flairlist endpoint are formatted differently than responses from all other
         * Listing endpoints. Most Listing endpoints return an object with a `children` property containing the Listing's children,
         * and `after` and `before` properties corresponding to the `after` and `before` querystring parameters that a client should
         * use in the next request. However, the api/flairlist endpoint returns an object with a `users` property containing the
         * Listing's children, and `next` and `prev` properties corresponding to the `after` and `before` querystring parameters. As
         * far as I can tell, there's no actual reason for this difference. >_>
         */
        response.after = response.next || null;
        response.before = response.prev || null;
        response.children = response.users;
        return _this9._r._newObject('Listing', response);
      }
    });
  }
  /**
   * @summary Configures the flair settings for this subreddit.
   * @param {object} options
   * @param {boolean} options.userFlairEnabled Determines whether user flair should be enabled
   * @param {string} options.userFlairPosition Determines the orientation of user flair relative to a given username. This
   * should be either the string 'left' or the string 'right'.
   * @param {boolean} options.userFlairSelfAssignEnabled Determines whether users should be able to edit their own flair
   * @param {string} options.linkFlairPosition Determines the orientation of link flair relative to a link title. This should
   * be either 'left' or 'right'.
   * @param {boolean} options.linkFlairSelfAssignEnabled Determines whether users should be able to edit the flair of their
   * submissions.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').configure_flair({
   *   userFlairEnabled: true,
   *   userFlairPosition: 'left',
   *   userFlairSelfAssignEnabled: false,
   *   linkFlairPosition: 'right',
   *   linkFlairSelfAssignEnabled: false
   * })
   */


  configureFlair(_ref5) {
    var _this10 = this;

    var user_flair_enabled = _ref5.user_flair_enabled,
        _ref5$userFlairEnable = _ref5.userFlairEnabled,
        userFlairEnabled = _ref5$userFlairEnable === void 0 ? user_flair_enabled : _ref5$userFlairEnable,
        user_flair_position = _ref5.user_flair_position,
        _ref5$userFlairPositi = _ref5.userFlairPosition,
        userFlairPosition = _ref5$userFlairPositi === void 0 ? user_flair_position : _ref5$userFlairPositi,
        user_flair_self_assign_enabled = _ref5.user_flair_self_assign_enabled,
        _ref5$userFlairSelfAs = _ref5.userFlairSelfAssignEnabled,
        userFlairSelfAssignEnabled = _ref5$userFlairSelfAs === void 0 ? user_flair_self_assign_enabled : _ref5$userFlairSelfAs,
        link_flair_position = _ref5.link_flair_position,
        _ref5$linkFlairPositi = _ref5.linkFlairPosition,
        linkFlairPosition = _ref5$linkFlairPositi === void 0 ? link_flair_position : _ref5$linkFlairPositi,
        link_flair_self_assign_enabled = _ref5.link_flair_self_assign_enabled,
        _ref5$linkFlairSelfAs = _ref5.linkFlairSelfAssignEnabled,
        linkFlairSelfAssignEnabled = _ref5$linkFlairSelfAs === void 0 ? link_flair_self_assign_enabled : _ref5$linkFlairSelfAs;
    return _asyncToGenerator(function* () {
      yield _this10._post({
        url: "r/".concat(_this10.display_name, "/api/flairconfig"),
        form: {
          api_type,
          flair_enabled: userFlairEnabled,
          flair_position: userFlairPosition,
          flair_self_assign_enabled: userFlairSelfAssignEnabled,
          link_flair_position: linkFlairPosition,
          link_flair_self_assign_enabled: linkFlairSelfAssignEnabled
        }
      });
      return _this10;
    })();
  }
  /**
   * @summary Gets the requester's flair on this subreddit.
   * @returns {Promise} An object representing the requester's current flair
   * @example
   *
   * r.getSubreddit('snoowrap').getMyFlair().then(console.log)
   * // => { flair_css_class: 'some-css-class',
   * //  flair_template_id: null,
   * //  flair_text: 'this is /u/snoowrap_testing\'s flair text',
   * //  flair_position: 'right'
   * // }
   */


  getMyFlair() {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      return (yield _this11._getFlairOptions()).current;
    })();
  }
  /**
   * @summary Sets the requester's flair on this subreddit.
   * @param {object} options
   * @param {string} options.flair_template_id A flair template ID to use. (This should be obtained beforehand using
   * {@link getUserFlairTemplates}.)
   * @param {string} [options.text] The flair text to use. (This is only necessary/useful if the given flair
   * template has the `text_editable` property set to `true`.)
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').selectMyFlair({flair_template_id: 'fdfd8532-c91e-11e5-b4d4-0e082084d721'})
   */


  selectMyFlair(options) {
    var _this12 = this;

    return _asyncToGenerator(function* () {
      /**
       * NOTE: This requires `identity` scope in addition to `flair` scope, since the reddit api needs to be passed a username.
       * I'm not sure if there's a way to do this without requiring additional scope.
       */
      var name = yield _this12._r._getMyName();
      yield _this12._r._selectFlair(_objectSpread({}, options, {
        subredditName: _this12.display_name,
        name
      }));
      return _this12;
    })();
  }

  _setMyFlairVisibility(flair_enabled) {
    var _this13 = this;

    return _asyncToGenerator(function* () {
      yield _this13._post({
        url: "r/".concat(_this13.display_name, "/api/setflairenabled"),
        form: {
          api_type,
          flair_enabled
        }
      });
      return _this13;
    })();
  }
  /**
   * @summary Makes the requester's flair visible on this subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').showMyFlair()
   */


  showMyFlair() {
    return this._setMyFlairVisibility(true);
  }
  /**
   * @summary Makes the requester's flair invisible on this subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').hideMyFlair()
   */


  hideMyFlair() {
    return this._setMyFlairVisibility(false);
  }
  /**
   * @summary Creates a new link submission on this subreddit.
   * @param {object} options An object containing details about the submission.
   * @param {string} options.title The title of the submission.
   * @param {string} options.url The url that the link submission should point to.
   * @param {boolean} [options.sendReplies=true] Determines whether inbox replies should be enabled for this submission.
   * @param {boolean} [options.resubmit=true] If this is `false` and same link has already been submitted to this subreddit in the past,
   * reddit will return an error. This could be used to avoid accidental reposts.
   * @param {boolean} [options.spoiler=false] Whether or not the submission should be marked as a spoiler.
   * @param {boolean} [options.nsfw=false] Whether or not the submission should be marked NSFW.
   * @param {string} [options.flairId] The flair template to select.
   * @param {string} [options.flairText] If a flair template is selected and its property `flair_text_editable` is `true`, this will
   * customize the flair text.
   * @param {string} [options.collectionId] The UUID of a collection to add the newly-submitted post to.
   * @param {string} [options.discussionType] Set to `CHAT` to enable live discussion instead of traditional comments.
   * @param {string} [options.captchaIden] A captcha identifier. This is only necessary if the authenticated account
   * requires a captcha to submit posts and comments.
   * @param {string} [options.captchaResponse] The response to the captcha with the given identifier.
   * @returns {Promise} The newly-created Submission object.
   * @example
   *
   * subreddit.submitLink({
   *   title: 'I found a cool website!',
   *   url: 'https://google.com'
   * }).then(console.log)
   * // => Submission { name: 't3_4abnfe' }
   * // (new linkpost created on reddit)
   */


  submitLink(options) {
    return this._r.submitLink(_objectSpread({}, options, {
      subredditName: this.display_name
    }));
  }
  /**
   * @summary Submit an image submission to this subreddit. (Undocumented endpoint).
   * @desc **NOTE**: This method won't work on browsers that don't support the Fetch API natively since it requires to perform
   * a 'no-cors' request which is impossible with the XMLHttpRequest API.
   * @param {object} options An object containing details about the submission.
   * @param {string} options.title The title of the submission.
   * @param {string|stream.Readable|Blob|File|MediaImg} options.imageFile The image that should get submitted. This should either be the path to
   * the image file you want to upload, or a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) /
   * [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) / [File](https://developer.mozilla.org/en-US/docs/Web/API/File) in environments
   * (e.g. browsers) where the filesystem is unavailable. Alternatively you can diractly pass a ready-to-use {@link MediaImg} instead.
   * See {@link snoowrap#uploadMedia} for more details.
   * @param {string} options.imageFileName The name that the image file should have. Required when it cannot be diractly extracted from
   * the provided file (e.g ReadableStream, Blob).
   * @param {boolean} [options.noWebsockets=false] Set to `true` to disable use of WebSockets. If `true`, this method will return `null`.
   * @param {boolean} [options.sendReplies=true] Determines whether inbox replies should be enabled for this submission.
   * @param {boolean} [options.resubmit=true] If this is `false` and same link has already been submitted to this subreddit in the past,
   * reddit will return an error. This could be used to avoid accidental reposts.
   * @param {boolean} [options.spoiler=false] Whether or not the submission should be marked as a spoiler.
   * @param {boolean} [options.nsfw=false] Whether or not the submission should be marked NSFW.
   * @param {string} [options.flairId] The flair template to select.
   * @param {string} [options.flairText] If a flair template is selected and its property `flair_text_editable` is `true`, this will
   * customize the flair text.
   * @param {string} [options.collectionId] The UUID of a collection to add the newly-submitted post to.
   * @param {string} [options.discussionType] Set to `CHAT` to enable live discussion instead of traditional comments.
   * @param {string} [options.captchaIden] A captcha identifier. This is only necessary if the authenticated account
   * requires a captcha to submit posts and comments.
   * @param {string} [options.captchaResponse] The response to the captcha with the given identifier.
   * @returns {Promise} The newly-created Submission object, or `null` if `options.noWebsockets` is `true`.
   * @example
   *
   * const blob = await (await fetch("https://example.com/kittens.jpg")).blob()
   * subreddit.submitImage({
   *   title: 'Take a look at those cute kittens <3',
   *   imageFile: blob, // Usage as a `Blob`.
   *   imageFileName: 'kittens.jpg'
   * }).then(console.log)
   * // => Submission
   * // (new image submission created on reddit)
   */


  submitImage(options) {
    return this._r.submitImage(_objectSpread({}, options, {
      subredditName: this.display_name
    }));
  }
  /**
   * @summary Submit a video or videogif submission to this subreddit. (Undocumented endpoint).
   * @desc **NOTE**: This method won't work on browsers that don't support the Fetch API natively since it requires to perform
   * a 'no-cors' request which is impossible with the XMLHttpRequest API.
   * @param {object} options An object containing details about the submission.
   * @param {string} options.title The title of the submission.
   * @param {string|stream.Readable|Blob|File|MediaVideo} options.videoFile The video that should get submitted. This should either be the path to
   * the video file you want to upload, or a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) /
   * [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) / [File](https://developer.mozilla.org/en-US/docs/Web/API/File) in environments
   * (e.g. browsers) where the filesystem is unavailable. Alternatively you can diractly pass a ready-to-use {@link MediaVideo} instead.
   * See {@link snoowrap#uploadMedia} for more details.
   * @param {string} options.videoFileName The name that the video file should have. Required when it cannot be diractly extracted from
   * the provided file (e.g ReadableStream, Blob).
   * @param {string|stream.Readable|Blob|File|MediaImg} options.thumbnailFile The image that should get uploaded and used as a thumbnail for the video. This
   * should either be the path to the image file you want to upload, or a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) /
   * [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) / [File](https://developer.mozilla.org/en-US/docs/Web/API/File) in environments
   * (e.g. browsers) where the filesystem is unavailable. Alternatively you can diractly pass a ready-to-use {@link MediaImg} instead.
   * See {@link snoowrap#uploadMedia} for more details.
   * @param {string} options.thumbnailFileName The name that the thumbnail file should have. Required when it cannot be diractly extracted from
   * the provided file (e.g ReadableStream, Blob).
   * @param {boolean} [options.videogif=false] If `true`, the video is submitted as a videogif, which is essentially a silent video.
   * @param {boolean} [options.noWebsockets=false] Set to `true` to disable use of WebSockets. If `true`, this method will return `null`.
   * @param {boolean} [options.sendReplies=true] Determines whether inbox replies should be enabled for this submission.
   * @param {boolean} [options.resubmit=true] If this is `false` and same link has already been submitted to this subreddit in the past,
   * reddit will return an error. This could be used to avoid accidental reposts.
   * @param {boolean} [options.spoiler=false] Whether or not the submission should be marked as a spoiler.
   * @param {boolean} [options.nsfw=false] Whether or not the submission should be marked NSFW.
   * @param {string} [options.flairId] The flair template to select.
   * @param {string} [options.flairText] If a flair template is selected and its property `flair_text_editable` is `true`, this will
   * customize the flair text.
   * @param {string} [options.collectionId] The UUID of a collection to add the newly-submitted post to.
   * @param {string} [options.discussionType] Set to `CHAT` to enable live discussion instead of traditional comments.
   * @param {string} [options.captchaIden] A captcha identifier. This is only necessary if the authenticated account
   * requires a captcha to submit posts and comments.
   * @param {string} [options.captchaResponse] The response to the captcha with the given identifier.
   * @returns {Promise} The newly-created Submission object, or `null` if `options.noWebsockets` is `true`.
   * @example
   *
   * const mediaVideo = await r.uploadMedia({
   *   file: './video.mp4',
   *   type: 'video'
   * })
   * subreddit.submitVideo({
   *   title: 'This is a video!',
   *   videoFile: mediaVideo, // Usage as a `MediaVideo`.
   *   thumbnailFile: fs.createReadStream('./thumbnail.png'), // Usage as a `stream.Readable`.
   *   thumbnailFileName: 'thumbnail.png'
   * }).then(console.log)
   * // => Submission
   * // (new video submission created on reddit)
   */


  submitVideo(options) {
    return this._r.submitVideo(_objectSpread({}, options, {
      subredditName: this.display_name
    }));
  }
  /**
   * @summary Submit a gallery to this subreddit. (Undocumented endpoint).
   * @desc **NOTE**: This method won't work on browsers that don't support the Fetch API natively since it requires to perform
   * a 'no-cors' request which is impossible with the XMLHttpRequest API.
   * @param {object} options An object containing details about the submission.
   * @param {string} options.title The title of the submission.
   * @param {Array} options.gallery An array containing 2 to 20 gallery items. Currently only images are accepted. A gallery item should
   * either be a {@link MediaImg}, or an object containing `imageFile` and `imageFileName` (the same as `options.imageFile` and `options.imageFileName`
   * used in {@link snoowrap#submitImage}) in addition of an optional `caption` with a maximum of 180 characters along with an optional `outboundUrl`
   * (the same as {@link MediaImg#caption} and {@link MediaImg#outboundUrl}).
   * @param {boolean} [options.sendReplies=true] Determines whether inbox replies should be enabled for this submission.
   * @param {boolean} [options.resubmit=true] If this is `false` and same link has already been submitted to this subreddit in the past,
   * reddit will return an error. This could be used to avoid accidental reposts.
   * @param {boolean} [options.spoiler=false] Whether or not the submission should be marked as a spoiler.
   * @param {boolean} [options.nsfw=false] Whether or not the submission should be marked NSFW.
   * @param {string} [options.flairId] The flair template to select.
   * @param {string} [options.flairText] If a flair template is selected and its property `flair_text_editable` is `true`, this will
   * customize the flair text.
   * @param {string} [options.collectionId] The UUID of a collection to add the newly-submitted post to.
   * @param {string} [options.discussionType] Set to `CHAT` to enable live discussion instead of traditional comments.
   * @param {string} [options.captchaIden] A captcha identifier. This is only necessary if the authenticated account
   * requires a captcha to submit posts and comments.
   * @param {string} [options.captchaResponse] The response to the captcha with the given identifier.
   * @returns {Promise} The newly-created Submission object, or `null` if `options.noWebsockets` is `true`.
   * @example
   *
   * const fileinput = document.getElementById('file-input')
   * const files = fileinput.files.map(file => { // Usage as an array of `File`s.
   *   return {
   *     imageFile: file,
   *     caption: file.name
   *   }
   * })
   * const blob = await (await fetch("https://example.com/kittens.jpg")).blob()
   * const mediaImg = await r.uploadMedia({ // Usage as a `MediaImg`.
   *   file: blob,
   *   type: 'img',
   *   caption: 'cute :3',
   *   outboundUrl: 'https://example.com/kittens.html'
   * })
   * subreddit.submitGallery({
   *   title: 'This is a gallery!',
   *   gallery: [mediaImg, ...files]
   * }).then(console.log)
   * // => Submission
   * // (new gallery submission created on reddit)
   */


  submitGallery(options) {
    return this._r.submitVideo(_objectSpread({}, options, {
      subredditName: this.display_name
    }));
  }
  /**
   * @summary Creates a new selfpost on this subreddit.
   * @param {object} options An object containing details about the submission.
   * @param {string} options.title The title of the submission.
   * @param {string} [options.text] The selftext of the submission.
   * @param {object} [options.inlineMedia] An object containing inctances of `MediaFile` subclasses, or `options` to pass to
   * {@link snoowrap#uploadMedia} where `options.type` is required. The keys of this object can be used as placeholders in
   * `options.text` with the format `{key}`.
   * @param {string} [options.rtjson] The body of the submission in `richtext_json` format. See {@link snoowrap#convertToFancypants}
   * for more details. This will override `options.text` and `options.inlineMedia`.
   * @param {boolean} [options.sendReplies=true] Determines whether inbox replies should be enabled for this submission.
   * @param {boolean} [options.resubmit=true] If this is `false` and same link has already been submitted to this subreddit in the past,
   * reddit will return an error. This could be used to avoid accidental reposts.
   * @param {boolean} [options.spoiler=false] Whether or not the submission should be marked as a spoiler.
   * @param {boolean} [options.nsfw=false] Whether or not the submission should be marked NSFW.
   * @param {string} [options.flairId] The flair template to select.
   * @param {string} [options.flairText] If a flair template is selected and its property `flair_text_editable` is `true`, this will
   * customize the flair text.
   * @param {string} [options.collectionId] The UUID of a collection to add the newly-submitted post to.
   * @param {string} [options.discussionType] Set to `CHAT` to enable live discussion instead of traditional comments.
   * @param {string} [options.captchaIden] A captcha identifier. This is only necessary if the authenticated account
   * requires a captcha to submit posts and comments.
   * @param {string} [options.captchaResponse] The response to the captcha with the given identifier.
   * @returns {Promise} The newly-created Submission object.
   * @example
   *
   * const mediaVideo = await r.uploadMedia({
   *   file: './video.mp4',
   *   type: 'video',
   *   caption: 'Short video!'
   * })
   * subreddit.submitSelfpost({
   *   title: 'This is a selfpost',
   *   text: 'This is the text body of the selfpost.\n\nAnd This is an inline image {img} And also a video! {vid}',
   *   inlineMedia: {
   *     img: {
   *       file: './animated.gif', // Usage as a file path.
   *       type: 'img'
   *     },
   *     vid: mediaVideo
   *   }
   * }).then(console.log)
   * // => Submission
   * // (new selfpost created on reddit)
   */


  submitSelfpost(options) {
    return this._r.submitSelfpost(_objectSpread({}, options, {
      subredditName: this.display_name
    }));
  }
  /**
   * @summary Submit a poll to this subreddit. (Undocumented endpoint).
   * @param {object} options An object containing details about the submission.
   * @param {string} options.title The title of the submission.
   * @param {string} [options.text] The selftext of the submission.
   * @param {string[]} options.choices An array of 2 to 6 poll options.
   * @param {number} options.duration The number of days the poll should accept votes. Valid values are between 1 and 7, inclusive.
   * @param {boolean} [options.sendReplies=true] Determines whether inbox replies should be enabled for this submission.
   * @param {boolean} [options.resubmit=true] If this is `false` and same link has already been submitted to this subreddit in the past,
   * reddit will return an error. This could be used to avoid accidental reposts.
   * @param {boolean} [options.spoiler=false] Whether or not the submission should be marked as a spoiler.
   * @param {boolean} [options.nsfw=false] Whether or not the submission should be marked NSFW.
   * @param {string} [options.flairId] The flair template to select.
   * @param {string} [options.flairText] If a flair template is selected and its property `flair_text_editable` is `true`, this will
   * customize the flair text.
   * @param {string} [options.collectionId] The UUID of a collection to add the newly-submitted post to.
   * @param {string} [options.discussionType] Set to `CHAT` to enable live discussion instead of traditional comments.
   * @param {string} [options.captchaIden] A captcha identifier. This is only necessary if the authenticated account
   * requires a captcha to submit posts and comments.
   * @param {string} [options.captchaResponse] The response to the captcha with the given identifier.
   * @returns {Promise} The newly-created Submission object.
   * @example
   *
   * subreddit.submitPoll({
   *   title: 'Survey!',
   *   text: 'Do you like snoowrap?',
   *   choices: ['YES!', 'NOPE!'],
   *   duration: 3
   * }).then(console.log)
   * // => Submission
   * // (new poll submission created on reddit)
   */


  submitPoll(options) {
    return this._r.submitPoll(_objectSpread({}, options, {
      subredditName: this.display_name
    }));
  }
  /**
   * @summary Creates a new crosspost submission on this subreddit
   * @desc **NOTE**: To create a crosspost, the authenticated account must be subscribed to the subreddit where
   * the crosspost is being submitted, and that subreddit be configured to allow crossposts.
   * @param {object} options An object containing details about the submission
   * @param {string} options.title The title of the crosspost
   * @param {(string|Submission)} options.originalPost A Submission object or a post ID for the original post which
   * is being crossposted
   * @param {boolean} [options.sendReplies=true] Determines whether inbox replies should be enabled for this submission.
   * @param {boolean} [options.resubmit=true] If this is `false` and same link has already been submitted to this subreddit in the past,
   * reddit will return an error. This could be used to avoid accidental reposts.
   * @param {boolean} [options.spoiler=false] Whether or not the submission should be marked as a spoiler.
   * @param {boolean} [options.nsfw=false] Whether or not the submission should be marked NSFW.
   * @param {string} [options.flairId] The flair template to select.
   * @param {string} [options.flairText] If a flair template is selected and its property `flair_text_editable` is `true`, this will
   * customize the flair text.
   * @param {string} [options.collectionId] The UUID of a collection to add the newly-submitted post to.
   * @param {string} [options.discussionType] Set to `CHAT` to enable live discussion instead of traditional comments.
   * @param {string} [options.captchaIden] A captcha identifier. This is only necessary if the authenticated account
   * requires a captcha to submit posts and comments.
   * @param {string} [options.captchaResponse] The response to the captcha with the given identifier.
   * @returns {Promise} The newly-created Submission object
   * @example
   *
   * subreddit.submitCrosspost({
   *  title: 'I found an interesting post',
   *  originalPost: '6vths0'
   * }).then(console.log)
   * // => Submission
   * // (new crosspost submission created on reddit)
   */


  submitCrosspost(options) {
    return this._r.submitCrosspost(_objectSpread({}, options, {
      subredditName: this.display_name
    }));
  }
  /**
   * @summary Gets a Listing of hot posts on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @returns {Promise} A Listing containing the retrieved submissions
   * @example
   *
   * r.getSubreddit('snoowrap').getHot().then(console.log)
   * // => Listing [
   * //  Submission { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  getHot(options) {
    return this._r.getHot(this.display_name, options);
  }
  /**
   * @summary Gets a Listing of new posts on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @returns {Promise} A Listing containing the retrieved submissions
   * @example
   *
   * r.getSubreddit('snoowrap').getNew().then(console.log)
   * // => Listing [
   * //  Submission { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   *
   */


  getNew(options) {
    return this._r.getNew(this.display_name, options);
  }
  /**
   * @summary Gets a Listing of new comments on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @returns {Promise} A Listing containing the retrieved comments
   * @example
   *
   * r.getSubreddit('snoowrap').getNewComments().then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  ...
   * // ]
   */


  getNewComments(options) {
    return this._r.getNewComments(this.display_name, options);
  }
  /**
   * @summary Gets a single random Submission from this subreddit.
   * @desc **Note**: This function will not work when snoowrap is running in a browser, because the reddit server sends a
   * redirect which cannot be followed by a CORS request.
   * @returns {Promise} The retrieved Submission object
   * @example
   *
   * r.getSubreddit('snoowrap').getRandomSubmission().then(console.log)
   * // => Submission { ... }
   */


  getRandomSubmission() {
    return this._r.getRandomSubmission(this.display_name);
  }
  /**
   * @summary Gets a Listing of top posts on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string} [options.time] Describes the timespan that posts should be retrieved from. Should be one of
   * `hour, day, week, month, year, all`
   * @returns {Promise} A Listing containing the retrieved submissions
   * @example
   *
   * r.getSubreddit('snoowrap').getTop({time: 'all'}).then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  ...
   * // ]
   */


  getTop(options) {
    return this._r.getTop(this.display_name, options);
  }
  /**
   * @summary Gets a Listing of controversial posts on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string} [options.time] Describes the timespan that posts should be retrieved from. Should be one of
   * `hour, day, week, month, year, all`
   * @returns {Promise} A Listing containing the retrieved submissions
   * @example
   *
   * r.getSubreddit('snoowrap').getControversial({time: 'week'}).then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  ...
   * // ]
   */


  getControversial(options) {
    return this._r.getControversial(this.display_name, options);
  }
  /**
   * @summary Gets a Listing of top posts on this subreddit.
   * @param {object} [options] Options for the resulting Listing
   * @returns {Promise} A Listing containing the retrieved submissions
   * @example
   *
   * r.getSubreddit('snoowrap').getRising().then(console.log)
   * // => Listing [
   * //  Submission { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  getRising(options) {
    return this._r.getRising(this.display_name, options);
  }
  /**
   * @summary Gets the moderator mail for this subreddit.
   * @param {object} [options] Options for the resulting Listing
   * @returns {Promise} A Listing containing PrivateMessage objects
   * @example r.getSubreddit('snoowrap').getModmail().then(console.log)
   */


  getModmail(options) {
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/message/moderator"),
      qs: options
    });
  }
  /**
   * @summary Gets a list of ModmailConversations from the subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @returns {Promise<Listing<ModmailConversation>>} A Listing containing Subreddits
   * @example
   *
   * r.getSubreddit('snoowrap').getNewModmailConversations({limit: 2}).then(console.log)
   * // => Listing [
   * //  ModmailConversation { messages: [...], objIds: [...], subject: 'test subject', ... },
   * //  ModmailConversation { messages: [...], objIds: [...], subject: 'test subject', ... }
   * // ]
   */


  getNewModmailConversations() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._r.getNewModmailConversations(_objectSpread({}, options, {
      entity: this.display_name
    }));
  }
  /**
   * @summary Gets the moderation log for this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string[]} [options.mods] An array of moderator names that the results should be restricted to
   * @param {string} [options.type] Restricts the results to the specified type. This should be one of `banuser, unbanuser,
   * removelink, approvelink, removecomment, approvecomment, addmoderator, invitemoderator, uninvitemoderator,
   * acceptmoderatorinvite, removemoderator, addcontributor, removecontributor, editsettings, editflair, distinguish, marknsfw,
   * wikibanned, wikicontributor, wikiunbanned, wikipagelisted, removewikicontributor, wikirevise, wikipermlevel,
   * ignorereports, unignorereports, setpermissions, setsuggestedsort, sticky, unsticky, setcontestmode, unsetcontestmode,
   * lock, unlock, muteuser, unmuteuser, createrule, editrule, deleterule, spoiler, unspoiler`
   * @returns {Promise} A Listing containing moderation actions
   * @example
   *
   * r.getSubreddit('snoowrap').getModerationLog().then(console.log)
   *
   * // => Listing [
   * //  ModAction { description: null, mod: 'snoowrap_testing', action: 'editflair', ... }
   * //  ModAction { description: null, mod: 'snoowrap_testing', action: 'approvecomment', ... }
   * //  ModAction { description: null, mod: 'snoowrap_testing', action: 'createrule', ... }
   * // ]
   */


  getModerationLog() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var parsedOptions = (0, _lodash.omit)(_objectSpread({}, options, {
      mod: options.mods && options.mods.join(',')
    }), 'mods');
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/log"),
      qs: parsedOptions
    });
  }
  /**
   * @summary Gets a list of reported items on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string} [options.only] Restricts the Listing to the specified type of item. One of `links, comments`
   * @returns {Promise} A Listing containing reported items
   * @example
   *
   * r.getSubreddit('snoowrap').getReports().then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  getReports() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/reports"),
      qs: options
    });
  }
  /**
   * @summary Gets a list of removed items on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string} [options.only] Restricts the Listing to the specified type of item. One of `links, comments`
   * @returns {Promise} A Listing containing removed items
   * @example
   *
   * r.getSubreddit('snoowrap').getSpam().then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  getSpam() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/spam"),
      qs: options
    });
  }
  /**
   * @summary Gets a list of items on the modqueue on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string} [options.only] Restricts the Listing to the specified type of item. One of `links, comments`
   * @returns {Promise} A Listing containing items on the modqueue
   * @example
   *
   * r.getSubreddit('snoowrap').getModqueue().then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  getModqueue() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/modqueue"),
      qs: options
    });
  }
  /**
   * @summary Gets a list of unmoderated items on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string} [options.only] Restricts the Listing to the specified type of item. One of `links, comments`
   * @returns {Promise} A Listing containing unmoderated items
   * @example
   *
   * r.getSubreddit('snoowrap').getUnmoderated().then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  getUnmoderated() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/unmoderated"),
      qs: options
    });
  }
  /**
   * @summary Gets a list of edited items on this subreddit.
   * @param {object} [options={}] Options for the resulting Listing
   * @param {string} [options.only] Restricts the Listing to the specified type of item. One of `links, comments`
   * @returns {Promise} A Listing containing edited items
   * @example
   *
   * r.getSubreddit('snoowrap').getEdited().then(console.log)
   * // => Listing [
   * //  Comment { ... },
   * //  Comment { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  getEdited() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/edited"),
      qs: options
    });
  }
  /**
   * @summary Accepts an invite to become a moderator of this subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').acceptModeratorInvite()
   */


  acceptModeratorInvite() {
    var _this14 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this14._post({
        url: "r/".concat(_this14.display_name, "/api/accept_moderator_invite"),
        form: {
          api_type
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this14;
    })();
  }
  /**
   * @summary Abdicates moderator status on this subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').leaveModerator()
   */


  leaveModerator() {
    var _this15 = this;

    return _asyncToGenerator(function* () {
      var name = (yield _this15.fetch()).name;
      var res = yield _this15._post({
        url: 'api/leavemoderator',
        form: {
          id: name
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this15;
    })();
  }
  /**
   * @summary Abdicates approved submitter status on this subreddit.
   * @returns {Promise} A Promise that resolves with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').leaveContributor()
   */


  leaveContributor() {
    var _this16 = this;

    return _asyncToGenerator(function* () {
      var name = (yield _this16.fetch()).name;
      var res = yield _this16._post({
        url: 'api/leavecontributor',
        form: {
          id: name
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this16;
    })();
  }
  /**
   * @summary Gets a subreddit's CSS stylesheet.
   * @desc **Note**: This function will not work when snoowrap is running in a browser, because the reddit server sends a
   * redirect which cannot be followed by a CORS request.
   * @desc **Note**: This method will return a 404 error if the subreddit in question does not have a custom stylesheet.
   * @returns {Promise} A Promise for a string containing the subreddit's CSS.
   * @example
   *
   * r.getSubreddit('snoowrap').getStylesheet().then(console.log)
   * // => '.md blockquote,.md del,body{color:#121212}.usertext-body ... '
   */


  getStylesheet() {
    return this._get({
      url: "r/".concat(this.display_name, "/stylesheet"),
      json: false
    });
  }
  /**
   * @summary Conducts a search of reddit submissions, restricted to this subreddit.
   * @param {object} options Search options. Can also contain options for the resulting Listing.
   * @param {string} options.query The search query
   * @param {string} [options.time] Describes the timespan that posts should be retrieved frome. One of
   * `hour, day, week, month, year, all`
   * @param {string} [options.sort] Determines how the results should be sorted. One of `relevance, hot, top, new, comments`
   * @param {string} [options.syntax='plain'] Specifies a syntax for the search. One of `cloudsearch, lucene, plain`
   * @returns {Promise} A Listing containing the search results.
   * @example
   *
   * r.getSubreddit('snoowrap').search({query: 'blah', sort: 'year'}).then(console.log)
   * // => Listing [
   * //  Submission { ... },
   * //  Submission { ... },
   * //  ...
   * // ]
   */


  search(options) {
    return this._r.search(_objectSpread({}, options, {
      subreddit: this,
      restrictSr: true
    }));
  }
  /**
   * @summary Gets the list of banned users on this subreddit.
   * @param {object} options Filtering options. Can also contain options for the resulting Listing.
   * @param {string} options.name A username on the list to jump to.
   * @returns {Promise} A Listing of users
   * @example
   *
   * r.getSubreddit('snoowrap').getBannedUsers().then(console.log)
   * // => Listing [
   * //  { date: 1461720936, note: '', name: 'actually_an_aardvark', id: 't2_q3519' }
   * //  ...
   * // ]
   *
   */


  getBannedUsers(options) {
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/banned"),
      qs: (0, _helpers.renameKey)(options, 'name', 'user')
    });
  }
  /**
   * @summary Gets the list of muted users on this subreddit.
   * @param {object} options Filtering options. Can also contain options for the resulting Listing.
   * @param {string} options.name A username on the list to jump to.
   * @returns {Promise} A Listing of users
   * @example
   *
   * r.getSubreddit('snoowrap').getBannedUsers().then(console.log)
   * // => Listing [
   * //  { date: 1461720936, name: 'actually_an_aardvark', id: 't2_q3519' }
   * //  ...
   * // ]
   */


  getMutedUsers(options) {
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/muted"),
      qs: (0, _helpers.renameKey)(options, 'name', 'user')
    });
  }
  /**
   * @summary Gets the list of users banned from this subreddit's wiki.
   * @param {object} options Filtering options. Can also contain options for the resulting Listing.
   * @param {string} options.name A username on the list to jump to.
   * @returns {Promise} A Listing of users
   * @example
   *
   * r.getSubreddit('snoowrap').getWikibannedUsers().then(console.log)
   * // => Listing [
   * //  { date: 1461720936, note: '', name: 'actually_an_aardvark', id: 't2_q3519' }
   * //  ...
   * // ]
   */


  getWikibannedUsers(options) {
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/wikibanned"),
      qs: (0, _helpers.renameKey)(options, 'name', 'user')
    });
  }
  /**
   * @summary Gets the list of approved submitters on this subreddit.
   * @param {object} options Filtering options. Can also contain options for the resulting Listing.
   * @param {string} options.name A username on the list to jump to.
   * @returns {Promise} A Listing of users
   * @example
   *
   * r.getSubreddit('snoowrap').getContributors().then(console.log)
   * // => Listing [
   * //  { date: 1461720936, name: 'actually_an_aardvark', id: 't2_q3519' }
   * //  ...
   * // ]
   */


  getContributors(options) {
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/contributors"),
      qs: (0, _helpers.renameKey)(options, 'name', 'user')
    });
  }
  /**
   * @summary Gets the list of approved wiki submitters on this subreddit .
   * @param {object} options Filtering options. Can also contain options for the resulting Listing.
   * @param {string} options.name A username on the list to jump to.
   * @returns {Promise} A Listing of users
   * @example
   *
   * r.getSubreddit('snoowrap').getWikiContributors().then(console.log)
   * // => Listing [
   * //  { date: 1461720936, name: 'actually_an_aardvark', id: 't2_q3519' }
   * //  ...
   * // ]
   */


  getWikiContributors(options) {
    return this._getListing({
      uri: "r/".concat(this.display_name, "/about/wikicontributors"),
      qs: (0, _helpers.renameKey)(options, 'name', 'user')
    });
  }
  /**
   * @summary Gets the list of moderators on this subreddit.
   * @param {object} options
   * @param {string} [options.name] The name of a user to find in the list
   * @returns {Promise} An Array of RedditUsers representing the moderators of this subreddit
   * @example
   *
   * r.getSubreddit('AskReddit').getModerators().then(console.log)
   * // => [
   * //  RedditUser { date: 1453862639, mod_permissions: [ 'all' ], name: 'not_an_aardvark', id: 't2_k83md' },
   * //  ...
   * // ]
   *
   */


  getModerators() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref6.name;

    return this._get({
      url: "r/".concat(this.display_name, "/about/moderators"),
      params: {
        user: name
      }
    });
  }
  /**
   * @summary Deletes the banner for this Subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteBanner()
   */


  deleteBanner() {
    var _this17 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this17._post({
        url: "r/".concat(_this17.display_name, "/api/delete_sr_banner"),
        form: {
          api_type
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this17;
    })();
  }
  /**
   * @summary Deletes the header image for this Subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteHeader()
   */


  deleteHeader() {
    var _this18 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this18._post({
        url: "r/".concat(_this18.display_name, "/api/delete_sr_header"),
        form: {
          api_type
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this18;
    })();
  }
  /**
   * @summary Deletes this subreddit's icon.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteIcon()
   */


  deleteIcon() {
    var _this19 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this19._post({
        url: "r/".concat(_this19.display_name, "/api/delete_sr_icon"),
        form: {
          api_type
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this19;
    })();
  }
  /**
   * @summary Deletes an image from this subreddit.
   * @param {object} options
   * @param {string} options.imageName The name of the image.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').deleteImage()
   */


  deleteImage(_ref7) {
    var _this20 = this;

    var image_name = _ref7.image_name,
        _ref7$imageName = _ref7.imageName,
        imageName = _ref7$imageName === void 0 ? image_name : _ref7$imageName;
    return _asyncToGenerator(function* () {
      var res = yield _this20._post({
        url: "r/".concat(_this20.display_name, "/api/delete_sr_img"),
        form: {
          api_type,
          img_name: imageName
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this20;
    })();
  }
  /**
   * @summary Gets this subreddit's current settings.
   * @returns {Promise} An Object containing this subreddit's current settings.
   * @example
   *
   * r.getSubreddit('snoowrap').getSettings().then(console.log)
   * // => SubredditSettings { default_set: true, submit_text: '', subreddit_type: 'private', ... }
   */


  getSettings() {
    return this._get({
      url: "r/".concat(this.display_name, "/about/edit")
    });
  }
  /**
   * @summary Edits this subreddit's settings.
   * @param {object} options An Object containing {[option name]: new value} mappings of the options that should be modified.
   * Any omitted option names will simply retain their previous values.
   * @param {string} options.title The text that should appear in the header of the subreddit
   * @param {string} options.public_description The text that appears with this Subreddit on the search page, or on the
   * blocked-access page if this subreddit is private. (500 characters max)
   * @param {string} options.description The sidebar text for the subreddit. (5120 characters max)
   * @param {string} [options.submit_text=''] The text to show below the submission page (1024 characters max)
   * @param {boolean} [options.hide_ads=false] Determines whether ads should be hidden on this subreddit. (This is only
   * allowed for gold-only subreddits.)
   * @param {string} [options.lang='en'] The language of the subreddit (represented as an IETF language tag)
   * @param {string} [options.type='public'] Determines who should be able to access the subreddit. This should be one of
   * `public, private, restricted, gold_restricted, gold_only, archived, employees_only`.
   * @param {string} [options.link_type='any'] Determines what types of submissions are allowed on the subreddit. This should
   * be one of `any, link, self`.
   * @param {string} [options.submit_link_label=undefined] Custom text to display on the button that submits a link. If
   * this is omitted, the default text will be displayed.
   * @param {string} [options.submit_text_label=undefined] Custom text to display on the button that submits a selfpost. If
   * this is omitted, the default text will be displayed.
   * @param {string} [options.wikimode='modonly'] Determines who can edit wiki pages on the subreddit. This should be one of
   * `modonly, anyone, disabled`.
   * @param {number} [options.wiki_edit_karma=0] The minimum amount of subreddit karma needed for someone to edit this
   * subreddit's wiki. (This is only relevant if `options.wikimode` is set to `anyone`.)
   * @param {number} [options.wiki_edit_age=0] The minimum account age (in days) needed for someone to edit this subreddit's
   * wiki. (This is only relevant if `options.wikimode` is set to `anyone`.)
   * @param {string} [options.spam_links='high'] The spam filter strength for links on this subreddit. This should be one of
   * `low, high, all`.
   * @param {string} [options.spam_selfposts='high'] The spam filter strength for selfposts on this subreddit. This should be
   * one of `low, high, all`.
   * @param {string} [options.spam_comments='high'] The spam filter strength for comments on this subreddit. This should be one
   * of `low, high, all`.
   * @param {boolean} [options.over_18=false] Determines whether this subreddit should be classified as NSFW
   * @param {boolean} [options.allow_top=true] Determines whether the new subreddit should be able to appear in /r/all and
   * trending subreddits
   * @param {boolean} [options.show_media=false] Determines whether image thumbnails should be enabled on this subreddit
   * @param {boolean} [options.show_media_preview=true] Determines whether media previews should be expanded by default on this
   * subreddit
   * @param {boolean} [options.allow_images=true] Determines whether image uploads and links to image hosting sites should be
   * enabled on this subreddit
   * @param {boolean} [options.exclude_banned_modqueue=false] Determines whether posts by site-wide banned users should be
   * excluded from the modqueue.
   * @param {boolean} [options.public_traffic=false] Determines whether the /about/traffic page for this subreddit should be
   * viewable by anyone.
   * @param {boolean} [options.collapse_deleted_comments=false] Determines whether deleted and removed comments should be
   * collapsed by default
   * @param {string} [options.suggested_comment_sort=undefined] The suggested comment sort for the subreddit. This should be
   * one of `confidence, top, new, controversial, old, random, qa`.If left blank, there will be no suggested sort,
   * which means that users will see the sort method that is set in their own preferences (usually `confidence`.)
   * @param {boolean} [options.spoilers_enabled=false] Determines whether users can mark their posts as spoilers
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').editSettings({submit_text: 'Welcome! Please be sure to read the rules.'})
   */


  editSettings(options) {
    var _this21 = this;

    return _asyncToGenerator(function* () {
      var currentValues = yield _this21.getSettings();
      var name = (yield _this21.fetch()).name;
      yield _this21._r._createOrEditSubreddit(_objectSpread({}, (0, _helpers.renameKey)(currentValues, 'subreddit_type', 'type'), {}, options, {
        sr: name
      }));
      return _this21;
    })();
  }
  /**
   * @summary Gets a list of recommended other subreddits given this one.
   * @param {object} [options]
   * @param {Array} [options.omit=[]] An Array of subreddit names that should be excluded from the listing.
   * @returns {Promise} An Array of subreddit names
   * @example
   *
   * r.getSubreddit('AskReddit').getRecommendedSubreddits().then(console.log);
   * // [ 'TheChurchOfRogers', 'Sleepycabin', ... ]
   */


  getRecommendedSubreddits(options) {
    var _this22 = this;

    return _asyncToGenerator(function* () {
      var toOmit = options.omit && options.omit.join(',');
      var names = yield _this22._get({
        url: "api/recommend/sr/".concat(_this22.display_name),
        params: {
          omit: toOmit
        }
      });
      return (0, _lodash.map)(names, 'sr_name');
    })();
  }
  /**
   * @summary Gets the submit text (which displays on the submission form) for this subreddit.
   * @returns {Promise} The submit text, represented as a string.
   * @example
   *
   * r.getSubreddit('snoowrap').getSubmitText().then(console.log)
   * // => 'Welcome! Please be sure to read the rules.'
   */


  getSubmitText() {
    var _this23 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this23._get({
        url: "r/".concat(_this23.display_name, "/api/submit_text")
      });
      return res.submit_text;
    })();
  }
  /**
   * @summary Updates this subreddit's stylesheet.
   * @param {object} options
   * @param {string} options.css The new contents of the stylesheet
   * @param {string} [options.reason] The reason for the change (256 characters max)
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').updateStylesheet({css: 'body {color:#00ff00;}', reason: 'yay green'})
   */


  updateStylesheet(_ref8) {
    var _this24 = this;

    var css = _ref8.css,
        reason = _ref8.reason;
    return _asyncToGenerator(function* () {
      var res = yield _this24._post({
        url: "r/".concat(_this24.display_name, "/api/subreddit_stylesheet"),
        form: {
          api_type,
          op: 'save',
          reason,
          stylesheet_contents: css
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this24;
    })();
  }

  _setSubscribed(status) {
    var _this25 = this;

    return _asyncToGenerator(function* () {
      yield _this25._post({
        url: 'api/subscribe',
        form: {
          action: status ? 'sub' : 'unsub',
          sr_name: _this25.display_name
        }
      });
      return _this25;
    })();
  }
  /**
   * @summary Subscribes to this subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').subscribe()
   */


  subscribe() {
    return this._setSubscribed(true);
  }
  /**
   * @summary Unsubscribes from this subreddit.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').unsubscribe()
   */


  unsubscribe() {
    var _this26 = this;

    return _asyncToGenerator(function* () {
      /**
       * Reddit returns a 404 error if the user attempts to unsubscribe to a subreddit that they weren't subscribed to in the
       * first place. It also (as one would expect) returns a 404 error if the subreddit in question does not exist. snoowrap
       * should swallow the first type of error internally, but it should raise the second type of error. Unfortunately, the errors
       * themselves are indistinguishable. So if a 404 error gets thrown, fetch the current subreddit to check if it exists. If it
       * does exist, then the 404 error was of the first type, so swallow it and return the current Subreddit object as usual. If
       * the subreddit doesn't exist, then the original error was of the second type, so throw it.
       */
      try {
        yield _this26._setSubscribed(false);
      } catch (e) {
        if (e.response.status === 404) {
          return yield _this26.fetch();
        }

        throw e;
      }

      return _this26;
    })();
  }

  _uploadSrImg(_ref9) {
    var _this27 = this;

    var name = _ref9.name,
        file = _ref9.file,
        uploadType = _ref9.uploadType,
        imageType = _ref9.imageType;
    return _asyncToGenerator(function* () {
      if (typeof file !== 'string' && !(file instanceof _stream.Readable)) {
        throw new _errors.InvalidMethodCallError('Uploaded image filepath must be a string or a ReadableStream.');
      }

      var parsedFile = typeof file === 'string' ? (0, _fs.createReadStream)(file) : file;
      var result = yield _this27._post({
        url: "r/".concat(_this27.display_name, "/api/upload_sr_img"),
        formData: {
          name,
          upload_type: uploadType,
          img_type: imageType,
          file: parsedFile
        }
      });

      if (result.errors.length) {
        throw result.errors[0];
      }

      return _this27;
    })();
  }
  /**
   * @summary Uploads an image for use in this subreddit's stylesheet.
   * @param {object} options
   * @param {string} options.name The name that the new image should have in the stylesheet
   * @param {string|stream.Readable} options.file The image file that should get uploaded. This should either be the path to an
   * image file, or a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) in environments (e.g.
   * browsers) where the filesystem is unavailable.
   * @param {string} [options.imageType='png'] Determines how the uploaded image should be stored. One of `png, jpg`
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').uploadSubredditImage({name: 'the cookie monster', file: './cookie_monster.png'})
   */


  uploadStylesheetImage(_ref10) {
    var name = _ref10.name,
        file = _ref10.file,
        _ref10$image_type = _ref10.image_type,
        image_type = _ref10$image_type === void 0 ? 'png' : _ref10$image_type,
        _ref10$imageType = _ref10.imageType,
        imageType = _ref10$imageType === void 0 ? image_type : _ref10$imageType;
    return this._uploadSrImg({
      name,
      file,
      imageType,
      uploadType: 'img'
    });
  }
  /**
   * @summary Uploads an image to use as this subreddit's header.
   * @param {object} options
   * @param {string|stream.Readable} options.file The image file that should get uploaded. This should either be the path to an
   * image file, or a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) for environments (e.g.
   * browsers) where the filesystem is unavailable.
   * @param {string} [options.imageType='png'] Determines how the uploaded image should be stored. One of `png, jpg`
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').uploadHeaderImage({name: 'the cookie monster', file: './cookie_monster.png'})
   */


  uploadHeaderImage(_ref11) {
    var file = _ref11.file,
        _ref11$image_type = _ref11.image_type,
        image_type = _ref11$image_type === void 0 ? 'png' : _ref11$image_type,
        _ref11$imageType = _ref11.imageType,
        imageType = _ref11$imageType === void 0 ? image_type : _ref11$imageType;
    return this._uploadSrImg({
      file,
      imageType,
      uploadType: 'header'
    });
  }
  /**
   * @summary Uploads an image to use as this subreddit's mobile icon.
   * @param {object} options
   * @param {string|stream.Readable} options.file The image file that should get uploaded. This should either be the path to an
   * image file, or a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) for environments (e.g.
   * browsers) where the filesystem is unavailable.
   * @param {string} [options.imageType='png'] Determines how the uploaded image should be stored. One of `png, jpg`
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').uploadIcon({name: 'the cookie monster', file: './cookie_monster.png'})
   */


  uploadIcon(_ref12) {
    var file = _ref12.file,
        _ref12$image_type = _ref12.image_type,
        image_type = _ref12$image_type === void 0 ? 'png' : _ref12$image_type,
        _ref12$imageType = _ref12.imageType,
        imageType = _ref12$imageType === void 0 ? image_type : _ref12$imageType;
    return this._uploadSrImg({
      file,
      imageType,
      uploadType: 'icon'
    });
  }
  /**
   * @summary Uploads an image to use as this subreddit's mobile banner.
   * @param {object} options
   * @param {string|stream.Readable} options.file The image file that should get uploaded. This should either be the path to an
   * image file, or a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) for environments (e.g.
   * browsers) where the filesystem is unavailable.
   * @param {string} [options.imageType='png'] Determines how the uploaded image should be stored. One of `png, jpg`
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete.
   * @example r.getSubreddit('snoowrap').uploadBannerImage({name: 'the cookie monster', file: './cookie_monster.png'})
   */


  uploadBannerImage(_ref13) {
    var file = _ref13.file,
        _ref13$image_type = _ref13.image_type,
        image_type = _ref13$image_type === void 0 ? 'png' : _ref13$image_type,
        _ref13$imageType = _ref13.imageType,
        imageType = _ref13$imageType === void 0 ? image_type : _ref13$imageType;
    return this._uploadSrImg({
      file,
      imageType,
      upload_type: 'banner'
    });
  }
  /**
   * @summary Gets information on this subreddit's rules.
   * @returns {Promise} A Promise that fulfills with information on this subreddit's rules.
   * @example
   *
   * r.getSubreddit('snoowrap').getRules().then(console.log)
   *
   * // => {
   *   rules: [
   *     {
   *       kind: 'all',
   *       short_name: 'Rule 1: No violating rule 1',
   *       description: 'Breaking this rule is not allowed.',
   *       ...
   *     },
   *     ...
   *   ],
   *   site_rules: [
   *     'Spam',
   *     'Personal and confidential information'',
   *     'Threatening, harassing, or inciting violence'
   *   ]
   * }
   */


  getRules() {
    return this._get({
      url: "r/".concat(this.display_name, "/about/rules")
    });
  }
  /**
   * @summary Gets the stickied post on this subreddit, or throws a 404 error if none exists.
   * @param {object} [options]
   * @param {number} [options.num=1] The number of the sticky to get. Should be either `1` (first sticky) or `2` (second sticky).
   * @returns {Promise} A Submission object representing this subreddit's stickied submission
   * @example
   * r.getSubreddit('snoowrap').getSticky({num: 2})
   * // => Submission { ... }
   */


  getSticky() {
    var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref14$num = _ref14.num,
        num = _ref14$num === void 0 ? 1 : _ref14$num;

    return this._get({
      url: "r/".concat(this.display_name, "/about/sticky"),
      params: {
        num
      }
    });
  }

  _friend(options) {
    var _this28 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this28._post({
        url: "r/".concat(_this28.display_name, "/api/friend"),
        form: _objectSpread({}, options, {
          api_type
        })
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this28;
    })();
  }

  _unfriend(options) {
    var _this29 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this29._post({
        url: "r/".concat(_this29.display_name, "/api/unfriend"),
        form: _objectSpread({}, options, {
          api_type
        })
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this29;
    })();
  }
  /**
   * @summary Invites the given user to be a moderator of this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the account that should be invited
   * @param {Array} [options.permissions] The moderator permissions that this user should have. This should be an array
   * containing some combination of `"wiki", "posts", "access", "mail", "config", "flair"`. To add a moderator with full
   * permissions, omit this property entirely.
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').inviteModerator({name: 'actually_an_aardvark', permissions: ['posts', 'wiki']})
   */


  inviteModerator(_ref15) {
    var name = _ref15.name,
        permissions = _ref15.permissions;
    return this._friend({
      name,
      permissions: (0, _helpers.formatModPermissions)(permissions),
      type: 'moderator_invite'
    });
  }
  /**
   * @summary Revokes an invitation for the given user to be a moderator.
   * @param {object} options
   * @param {string} options.name The username of the account whose invitation should be revoked
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').revokeModeratorInvite({name: 'actually_an_aardvark'})
   */


  revokeModeratorInvite(_ref16) {
    var name = _ref16.name;
    return this._unfriend({
      name,
      type: 'moderator_invite'
    });
  }
  /**
   * @summary Removes the given user's moderator status on this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the account whose moderator status should be removed
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').removeModerator({name: 'actually_an_aardvark'})
   */


  removeModerator(_ref17) {
    var name = _ref17.name;
    return this._unfriend({
      name,
      type: 'moderator'
    });
  }
  /**
   * @summary Makes the given user an approved submitter of this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the account that should be given this status
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').addContributor({name: 'actually_an_aardvark'})
   */


  addContributor(_ref18) {
    var name = _ref18.name;
    return this._friend({
      name,
      type: 'contributor'
    });
  }
  /**
   * @summary Revokes this user's approved submitter status on this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the account whose status should be revoked
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').removeContributor({name: 'actually_an_aardvark'})
   */


  removeContributor(_ref19) {
    var name = _ref19.name;
    return this._unfriend({
      name,
      type: 'contributor'
    });
  }
  /**
   * @summary Bans the given user from this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the account that should be banned
   * @param {string} [options.banMessage] The ban message. This will get sent to the user in a private message, alerting them
   * that they have been banned.
   * @param {string} [options.banReason] A string indicating which rule the banned user broke (100 characters max)
   * @param {number} [options.duration] The duration of the ban, in days. For a permanent ban, omit this parameter.
   * @param {string} [options.banNote] A note that appears on the moderation log, usually used to indicate the reason for the
   * ban. This is not visible to the banned user. (300 characters max)
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').banUser({name: 'actually_an_aardvark', banMessage: 'You are now banned LOL'})
   */


  banUser(_ref20) {
    var name = _ref20.name,
        ban_message = _ref20.ban_message,
        _ref20$banMessage = _ref20.banMessage,
        banMessage = _ref20$banMessage === void 0 ? ban_message : _ref20$banMessage,
        ban_reason = _ref20.ban_reason,
        _ref20$banReason = _ref20.banReason,
        banReason = _ref20$banReason === void 0 ? ban_reason : _ref20$banReason,
        duration = _ref20.duration,
        ban_note = _ref20.ban_note,
        _ref20$banNote = _ref20.banNote,
        banNote = _ref20$banNote === void 0 ? ban_note : _ref20$banNote;
    return this._friend({
      name,
      ban_message: banMessage,
      ban_reason: banReason,
      duration,
      note: banNote,
      type: 'banned'
    });
  }
  /**
   * @summary Unbans the given user from this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the account that should be unbanned
   * @returns {Promise} A Promise that fulfills when the request is complete
   * @example r.getSubreddit('snoowrap').unbanUser({name: 'actually_an_aardvark'})
   */


  unbanUser(_ref21) {
    var name = _ref21.name;
    return this._unfriend({
      name,
      type: 'banned'
    });
  }
  /**
   * @summary Mutes the given user from messaging this subreddit for 72 hours.
   * @param {object} options
   * @param {string} options.name The username of the account that should be muted
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').muteUser({name: 'actually_an_aardvark'})
   */


  muteUser(_ref22) {
    var name = _ref22.name;
    return this._friend({
      name,
      type: 'muted'
    });
  }
  /**
   * @summary Unmutes the given user from messaging this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the account that should be muted
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').unmuteUser({name: 'actually_an_aardvark'})
   */


  unmuteUser(_ref23) {
    var name = _ref23.name;
    return this._unfriend({
      name,
      type: 'muted'
    });
  }
  /**
   * @summary Bans the given user from editing this subreddit's wiki.
   * @param {object} options
   * @param {string} options.name The username of the account that should be wikibanned
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').wikibanUser({name: 'actually_an_aardvark'})
   */


  wikibanUser(_ref24) {
    var name = _ref24.name;
    return this._friend({
      name,
      type: 'wikibanned'
    });
  }
  /**
   * @summary Unbans the given user from editing this subreddit's wiki.
   * @param {object} options
   * @param {string} options.name The username of the account that should be unwikibanned
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').unwikibanUser({name: 'actually_an_aardvark'})
   */


  unwikibanUser(_ref25) {
    var name = _ref25.name;
    return this._unfriend({
      name,
      type: 'wikibanned'
    });
  }
  /**
   * @summary Adds the given user to this subreddit's list of approved wiki editors.
   * @param {object} options
   * @param {string} options.name The username of the account that should be given approved editor status
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').addWikiContributor({name: 'actually_an_aardvark'})
   */


  addWikiContributor(_ref26) {
    var name = _ref26.name;
    return this._friend({
      name,
      type: 'wikicontributor'
    });
  }
  /**
   * @summary Removes the given user from this subreddit's list of approved wiki editors.
   * @param {object} options
   * @param {string} options.name The username of the account whose approved editor status should be revoked
   * @returns {Promise} A Promise that fulfills with this Subreddit when the request is complete
   * @example r.getSubreddit('snoowrap').removeWikiContributor({name: 'actually_an_aardvark'})
   */


  removeWikiContributor(_ref27) {
    var name = _ref27.name;
    return this._unfriend({
      name,
      type: 'wikicontributor'
    });
  }
  /**
   * @summary Sets the permissions for a given moderator on this subreddit.
   * @param {object} options
   * @param {string} options.name The username of the moderator whose permissions are being changed
   * @param {Array} [options.permissions] The new moderator permissions that this user should have. This should be an array
   * containing some combination of `"wiki", "posts", "access", "mail", "config", "flair"`. To add a moderator with full
   * permissions, omit this property entirely.
   * @returns {Promise} A Promise that fulfills with this Subreddit when this request is complete
   * @example r.getSubreddit('snoowrap').setModeratorPermissions({name: 'actually_an_aardvark', permissions: ['mail']})
   */


  setModeratorPermissions(_ref28) {
    var _this30 = this;

    var name = _ref28.name,
        permissions = _ref28.permissions;
    return _asyncToGenerator(function* () {
      var res = yield _this30._post({
        url: "r/".concat(_this30.display_name, "/api/setpermissions"),
        form: {
          api_type,
          name,
          permissions: (0, _helpers.formatModPermissions)(permissions),
          type: 'moderator'
        }
      });
      (0, _helpers.handleJsonErrors)(res);
      return _this30;
    })();
  }
  /**
   * @summary Gets a given wiki page on this subreddit.
   * @param {string} title The title of the desired wiki page.
   * @returns {WikiPage} An unfetched WikiPage object corresponding to the desired wiki page
   * @example
   *
   * r.getSubreddit('snoowrap').getWikiPage('index')
   * // => WikiPage { title: 'index', subreddit: Subreddit { display_name: 'snoowrap' } }
   */


  getWikiPage(title) {
    return this._r._newObject('WikiPage', {
      subreddit: this,
      title
    });
  }
  /**
   * @summary Gets the list of wiki pages on this subreddit.
   * @returns {Promise} An Array containing WikiPage objects
   * @example
   *
   * r.getSubreddit('snoowrap').getWikiPages().then(console.log)
   * // => [
   * //   WikiPage { title: 'index', subreddit: Subreddit { display_name: 'snoowrap'} }
   * //   WikiPage { title: 'config/sidebar', subreddit: Subreddit { display_name: 'snoowrap'} }
   * //   WikiPage { title: 'secret_things', subreddit: Subreddit { display_name: 'snoowrap'} }
   * //   WikiPage { title: 'config/submit_text', subreddit: Subreddit { display_name: 'snoowrap'} }
   * // ]
   */


  getWikiPages() {
    var _this31 = this;

    return _asyncToGenerator(function* () {
      var res = yield _this31._get({
        url: "r/".concat(_this31.display_name, "/wiki/pages")
      });
      return res.map(function (title) {
        return _this31.getWikiPage(title);
      });
    })();
  }
  /**
   * @summary Gets a list of revisions on this subreddit's wiki.
   * @param {object} [options] Options for the resulting Listing
   * @returns {Promise} A Listing containing wiki revisions
   * @example
   *
   * r.getSubreddit('snoowrap').getWikiRevisions().then(console.log)
   * // => Listing [
   * //  { page: 'index', reason: 'added cookies', ... },
   * //  ...
   * // ]
   */


  getWikiRevisions(options) {
    return this._getListing({
      uri: "r/".concat(this.display_name, "/wiki/revisions"),
      qs: options
    });
  }

};
var _default = Subreddit;
exports.default = _default;