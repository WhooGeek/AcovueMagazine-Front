import S3UploadAdapter from '../PostDetail/S3UploadAdapter.js';

/**
 * CKEditor에 커스텀 업로드 어댑터를 연결하는 플러그인 함수
 * @param {function} setImageUrls - 부모 컴포넌트의 이미지 상태 업데이트 함수
 * @returns {class} - CKEditor 플러그인 클래스
 */
export const getUploadAdapterPlugin = (setImageUrls) => {
    return class MyUploadAdapterPlugin {
        constructor(editor) {
            this.editor = editor;
        }
        init() {
            this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                // 여기서 setImageUrls를 S3UploadAdapter에게 전달
                return new S3UploadAdapter(loader, setImageUrls);
            };
        }
    };
};