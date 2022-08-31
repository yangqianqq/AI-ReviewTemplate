// 上传佐证组件代码
import React, { useEffect, useState, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import request from '@/src/common/api';
import {
    AtImagePicker,
    AtButton,
    AtModal,
    AtModalContent,
    AtModalAction
} from 'taro-ui';
import './index.scss';

export default ({
    classname = '',
    propsImg = '',
    contentStyle = {},
    style = {},
    circle = false,
    showBtn = false,
    updateImgUrl,
    showBtnText = '',
    multiple = false,
    value = [],
    initImg = '',
    readOnly = false
}) => {
    const currentIndex = useRef();
    const imageList = useRef<any>([]);
    const [files, setFiles] = useState<any>(value);
    const [showImg, setShowImg] = useState(propsImg);
    const [showDel, setShowDel] = useState(false);

    //上传图片-网络请求
    const updateImg = async (filePath, name, file) => {
        if (!multiple) {
            updateImgUrl(filePath);
        }

        Taro.showLoading({ title: '图片上传中...' });
        let formData = {
            filePath,
            name
        };

        let res = await request.uploadImg(formData);
        Taro.hideLoading();

        if (res.code === 200) {
            updateImgUrl(res.data.url);
        } else {
            Taro.showToast({
                title: res.msg,
                icon: 'none'
            });
        }
    };

    //多张图片
    const onMultipleChangeNormal = (v, type, index) => {
        if (type === 'add' && v.length > 0) {
            console.log(files);
            console.log(v.slice(files.length));
            uploadLoader({ path: v.slice(files.length).map(i => i.url) });
            updateImgUrl(
                v.map(i => i.url),
                'remove',
                true
            );
        } else {
            //删除图片
            setShowDel(true);
            currentIndex.current = index;
            return false;
        }
    };

    // 多选上传组件
    const uploadLoader = data => {
        const token = Taro.getStorageSync('uniqueToken');

        let i = data.i ? data.i : 0; // 当前所上传的图片位置
        let success = data.success ? data.success : 0; //上传成功的个数
        let fail = data.fail ? data.fail : 0; //上传失败的个数
        Taro.showLoading({
            title: `正在上传第${i + 1}张`
        });
        //发起上传
        Taro.uploadFile({
            // @ts-ignore
            url: `${REQUEST_URL}/api/v1/upload/image`,
            header: {
                Authorization: token
            },
            name: 'file',
            filePath: data.path[i],
            success: resp => {
                //图片上传成功，图片上传成功的变量+1
                let resultData = JSON.parse(resp.data);
                console.log(resultData);
                if (resultData.code === 200) {
                    imageList.current = [
                        ...imageList.current,
                        resultData.data.url
                    ];
                    success++;
                } else {
                    fail++;
                }
            },
            fail: () => {
                fail++; //图片上传失败，图片上传失败的变量+1
            },
            complete: () => {
                Taro.hideLoading();
                i++; //这个图片执行完上传后，开始上传下一张
                if (i == data.path.length) {
                    //当图片传完时，停止调用
                    updateImgUrl(imageList.current, 'remove');
                    Taro.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 2000
                    });
                } else {
                    //若图片还没有传完，则继续调用函数
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    uploadLoader(data);
                }
            }
        });
    };

    //单张图片
    const onChange = () => {
        if (readOnly) {
            Taro.previewImage({
                current: showImg,
                urls: [showImg]
            });
        } else {
            Taro.chooseImage({
                count: 1,
                success: inRes => {
                    process.env.TARO_ENV === 'h5'
                        ? updateImg(
                              inRes.tempFilePaths,
                              inRes.tempFiles[0]?.['originalFileObj']?.[
                                  'name'
                              ] || 'img.png',
                              inRes
                          )
                        : updateImg(inRes.tempFilePaths[0], 'img.png', inRes);
                }
            });
        }
    };

    //删除图片
    const removeImg = index => {
        files.splice(index, 1);
        setFiles([...files]);
        updateImgUrl([...files.map(i => i.url)], 'remove', index);
        imageList.current = [...files.map(i => i.url)];
    };

    const onImageClick = index => {
        Taro.previewImage({
            current: files[index]?.['url'],
            urls: files.map(i => i.url)
        });
    };

    useEffect(() => {
        !multiple && setShowImg(propsImg || initImg);
    }, [propsImg]);

    useEffect(() => {
        multiple && setFiles(value.map((i: any) => ({ url: i })));
    }, [value]);

    let imgContentStyle: any = Object.assign(
        { width: '100%', height: '100%' },
        style
    );
    let arr = [
        IMG_COMMON_URL + 'card1.svg',
        IMG_COMMON_URL + 'card2.svg',
        IMG_COMMON_URL + 'post1.svg'
    ];
    return (
        <View className={`uploadImage ${classname}`}>
            <View
                className={multiple ? 'multipleImgHide' : 'changeImgContent'}
                style={contentStyle}
            >
                {multiple ? (
                    <View
                        style={imgContentStyle}
                        className={files.length > 0 ? 'moreAtImagePicker' : ''}
                    >
                        <AtImagePicker
                            multiple={multiple}
                            files={files}
                            onChange={onMultipleChangeNormal}
                            onImageClick={onImageClick}
                            showAddBtn
                        />
                    </View>
                ) : (
                    <View onClick={onChange} style={imgContentStyle}>
                        <Image
                            className={`userImg ${circle && 'circleUserImg'}`}
                            src={showImg}
                            // circle={circle}
                        ></Image>
                    </View>
                )}
                {!readOnly &&
                    process.env.TARO_ENV === 'h5' &&
                    !multiple &&
                    !showBtn &&
                    arr.indexOf(showImg) < 0 && (
                        <View
                            onClick={() => {
                                setShowDel(true);
                            }}
                        >
                            <Image
                                src={`${IMG_COMMON_URL}imgDel.png`}
                                className="delLogo"
                            ></Image>
                        </View>
                    )}

                {showBtn && (
                    <AtButton className="changeImgBtn" onClick={onChange}>
                        {showBtnText}
                    </AtButton>
                )}
            </View>

            {/* 确认框 */}
            <AtModal
                onClose={e => {
                    showDel && setShowDel(false);
                }}
                onCancel={e => {
                    showDel && setShowDel(false);
                }}
                isOpened={showDel}
                className="confirmModal"
            >
                <AtModalContent>
                    <View className="delTips">确认删除该图片吗?</View>
                </AtModalContent>

                <AtModalAction>
                    <AtButton
                        className="delBtn"
                        onClick={() => {
                            setShowDel(false);
                        }}
                    >
                        取消
                    </AtButton>
                    <AtButton
                        className="sureBtn"
                        onClick={() => {
                            if (multiple) {
                                removeImg(currentIndex.current);
                            } else {
                                updateImgUrl(initImg);
                            }
                            setShowDel(false);
                        }}
                    >
                        确定
                    </AtButton>
                </AtModalAction>
            </AtModal>
        </View>
    );
};
