import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react'

type Props = {
    value?: string
    onSuccess?: (fileName: string) => void
}

export default function ImgUpload(props: Props) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (!props.value) return;
        setImageUrl(props.value);
    }, [props.value]);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const onChange = async ({ file }: UploadChangeParam<UploadFile<ApiResponse>>) => {
        if (file.status === "uploading") {
            return setLoading(true);
        }

        if (file.status === "error") {
            return message.error(file.response?.data)
        }

        if (file.status === "done") {
            setImageUrl(file.response?.data);
            props.onSuccess?.(file.response?.data)
        }
        setLoading(false);
    }


    return (
        <Upload
            name="file"
            listType="picture-circle"
            showUploadList={false}
            action="http://localhost:3001/user/upload"
            style={{ overflow: 'hidden' }}
            onChange={onChange}
        >
            {imageUrl
                ? <img
                    src={'http://localhost:3001/' + imageUrl}
                    alt='avatar'
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
                : uploadButton}
        </Upload>
    )
}