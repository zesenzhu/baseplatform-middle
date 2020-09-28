/*
 *                                |~~~~~~~|
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *     |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
 *     |  \  o \_         ,XXXXX),                         _..-~ o /  |
 *     |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
 *      ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
 *               `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
 *                 ~-.       `:;;/;; \          _..-~~
 *                    ~-._      `''        /-~-~
 *                        `\              /  /
 *                          |         ,   | |
 *                           |  '        /  |
 *                            \/;          |
 *                             ;;          |
 *                             `;   .       |
 *                             |~~~-----.....|
 *                            | \             \
 *                           | /\~~--...__    |
 *                           (|  `\       __-\|
 *                           ||    \_   /~    |
 *                           |)     \~-'      |
 *                            |      | \      '
 *                            |      |  \    :
 *                             \     |  |    |
 *                              |    )  (    )
 *                               \  /;  /\  |
 *                               |    |/   |
 *                               |    |   |
 *                                \  .'  ||
 *                                |  |  | |
 *                                (  | |  |
 *                                |   \ \ |
 *                                || o `.)|
 *                                |`\\) |
 *                                |       |
 *                                |       |
 * 
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-09-17 11:33:43
 * @LastEditTime: 2020-09-19 10:57:55
 * @Description: Loading 还可在项目移植后用
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\actions\PublicAction\Loading.js
 */

const APP_LOADING_CLOSE = "APP_LOADING_CLOSE";
const APP_LOADING_OPEN = "APP_LOADING_OPEN";
const MODAL_LOADING_CLOSE = "MODAL_LOADING_CLOSE";
const MODAL_LOADING_OPEN = "MODAL_LOADING_OPEN";
const TABLE_LOADING_CLOSE = "TABLE_LOADING_CLOSE";
const TABLE_LOADING_OPEN = "TABLE_LOADING_OPEN";
const CONTENT_LOADING_CLOSE = "CONTENT_LOADING_CLOSE";
const CONTENT_LOADING_OPEN = "CONTENT_LOADING_OPEN";

//loading
const ModalLoadingOpen = () => {
  return { type: MODAL_LOADING_OPEN };
};
const ModalLoadingClose = () => {
  return { type: MODAL_LOADING_CLOSE };
};
//loading
const TableLoadingOpen = () => {
  return { type: TABLE_LOADING_OPEN };
};
const TableLoadingClose = () => {
  return { type: TABLE_LOADING_CLOSE };
};
const AppLoadingOpen = () => {
  return { type: APP_LOADING_OPEN };
};
const AppLoadingClose = () => {
  return { type: APP_LOADING_CLOSE };
};
const ContentLoadingOpen = () => {
  return { type: CONTENT_LOADING_OPEN };
};
const ContentLoadingClose = () => {
  return { type: CONTENT_LOADING_CLOSE };
};
const MORE_LOADING_CLOSE = 'MORE_LOADING_CLOSE';
const MORE_LOADING_OPEN = 'MORE_LOADING_OPEN';
const MoreLoadingOpen = () => {
  return { type: MORE_LOADING_OPEN };
};
const MoreLoadingClose = () => {
  return { type: MORE_LOADING_CLOSE };
};
export default {
  MORE_LOADING_CLOSE,
  MORE_LOADING_OPEN,
  MoreLoadingOpen,
  MoreLoadingClose,

  
  APP_LOADING_CLOSE,
  APP_LOADING_OPEN,
  AppLoadingOpen,
  AppLoadingClose,

  MODAL_LOADING_CLOSE,
  MODAL_LOADING_OPEN,
  ModalLoadingOpen,
  ModalLoadingClose,

  TABLE_LOADING_OPEN,
  TABLE_LOADING_CLOSE,
  TableLoadingOpen,
  TableLoadingClose,

  CONTENT_LOADING_CLOSE,
  CONTENT_LOADING_OPEN,
  ContentLoadingOpen,
  ContentLoadingClose,
};
