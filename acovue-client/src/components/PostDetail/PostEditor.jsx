import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import S3UploadAdapter from './S3UploadAdapter';
import { getUploadAdapterPlugin } from '../Util/ckeditorUtils';
import './PostEditor.css'; 



const PostEditor = ({ content, setContent, setImageUrls }) => {

  const uploadPlugin = getUploadAdapterPlugin(setImageUrls);

  return (
    <div className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={content} // 초기 데이터
        config={{
          placeholder: "내용을 입력하세요.",
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'uploadImage', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'undo', 'redo'
          ],
          image: {
            styles: [
              'full',
              'alignLeft',
              'alignRight'
            
            ],
            resizeOptions: [
              {
                name: 'resizeImage:original',
                label: 'Original',
                value: null
              },
              {
                name: 'imageResize:50',
                label: '50%',
                value: '50'
              },
              {
                name: 'imageResize:75',
                label: '75%',
                value: '75'
              }
            ],
            toolbar: [
              'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight',
              '|',
              'imageResize',
              '|',
              'imageTextAlternative'
            ]
          },
          extraPlugins: [uploadPlugin] // 커스텀 업로드 어댑터 플러그인 추가
        }}

        onReady={(editor) => {
            // 에디터가 처음 켜질 때 초기값이 잘 들어갔는지 확인
            console.log("Editor Ready. Initial data:", editor.getData());
            console.log("✅ 에디터 준비 완료!", editor.ui.view.toolbar.items); // C번 로그
            
        }}

        onChange={(event, editor) => {
          const data = editor.getData(); 
          setContent(data);
        }}

        onBlur={(event, editor) => {
            const data = editor.getData();
            setContent(data);
        }}
      />
    </div>
  );
};

export default PostEditor;