import './modal.scss';
import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  haddleIsShowModal,
  selectModal,
} from '../../redux/modal';
const Modal = () => {
  const state = useSelector(selectModal);
  console.log(state);
  const { isShowModal } = state;
  const dispatch = useDispatch();
  return isShowModal
    ? createPortal(
        <div className="modal-container">
          <div className="modal-box">
            <h3 className="title-modal fz-18">
              Dành Cho Tài Khoản VIP
            </h3>
            <div className="content-modal">
              <p className="sub-text">
                Theo yêu cầu của đơn vị sở hữu bản quyền,
              </p>
              <p className="sub-text">
                bạn cần tài khoản VIP để nghe bài hát này.
              </p>
            </div>
            <div className="btn-modal">
              <button>ĐĂNG NHẬP TÀI KHOẢN VIP</button>
            </div>
            <div
              className="btn-close"
              onClick={() => {
                dispatch(haddleIsShowModal(false));
              }}
            >
              <i class="icon ic-close"></i>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};
export default Modal;
