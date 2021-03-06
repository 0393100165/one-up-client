import React, { Fragment, useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, message } from 'antd';
import { axios } from '../../config/constant';
import { Link } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { storage } from "../../firebase/firebase";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { QuillEditor } from '../allJS'

export default function BanHang_TaoMoiSanPham(props) {
    const [cookies, setCookie] = useCookies();
    const [shopID, setShopID] = useState(cookies.shopID);
    const [files, setFiles] = useState([])
    const { TabPane } = Tabs;
    const { Option } = Select;
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const [countAnhDaUploadThanhCong_Chinh, setCountAnhDaUploadThanhCong_Chinh] = useState(0);
    const [countAnhDaUploadThanhCong_Phu, setCountAnhDaUploadThanhCong_Phu] = useState(0);
    const [firstTime, setFirstTime] = useState(true);
    const [firstTime3, setFirstTime3] = useState(true);
    const [firstTime4, setFirstTime4] = useState(true);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCountries, setDataCountries] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [spinnerBrand, setSpinnerBrand] = useState(false);
    const [disableFieldBaoHanh, setDisableFieldBaoHanh] = useState(false);
    const [dataPhanLoai, setDataPhanLoai] = useState({
        mauSac: {
            mauSac1: '',
            mauSac2: '',
            mauSac3: '',
            mauSac4: ''
        },
        size: {
            size1: '',
            size2: '',
            size3: '',
            size4: ''
        }
    })
    const [dataTaoMoiSanPham, setDataTaoMoiSanPham] = useState({
        ten: '',
        img: {
            chinh: '',
            phu: []
        },
        gia: 0,
        noiSanXuat: '',
        moTa: '',
        moTaNganGon: [],
        soSao: 0,
        giaTriGiamGia: 0,
        soLuong: 0,
        thongTinBaoHanh: {
            baoHanh: true,
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        ngayTao: new Date(),
        idBrand: '',
        idCategory: '',
        idShop: '',
        idEvent: '',
        isAccept: false,
        isLock: false,
        isDelete: false
    });
    const [imageAsFile, setImageAsFile] = useState([]);
    const [imageAsFile_Chinh, setImageAsFile_Chinh] = useState([]);
    const [imageAsFile_Phu, setImageAsFile_Phu] = useState([]);
    const [imageAsUrl, setImageAsUrl] = useState([]);
    const [imageAsUrl_Chinh, setImageAsUrl_Chinh] = useState([]);
    const [imageAsUrl_Phu, setImageAsUrl_Phu] = useState([]);
    const [dataThem, setDataThem] = useState({
        ten: '',
        xuatXu: '',
        img: ''
    });
    const [showModalTaoMoiBrand, setShowModalTaoMoiBrand] = useState(false);
    const [showModalTaoPhanLoai, setShowModalTaoPhanLoai] = useState(false);
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile(listFile);

        if (listFile.length === 0) {
            console.log('Kh??ng c?? file n??o ???????c upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                listUrl.push(fireBaseUrl);

                                setCountAnhDaUploadThanhCong(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl(listUrl);
    }


    const handleChangeIMG_Chinh = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Chinh(listFile);

        if (listFile.length === 0) {
            console.log('Kh??ng c?? file n??o ???????c upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong_Chinh(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Chinh(listUrl);
    }

    const handleChangeIMG_Phu = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Phu(listFile);

        if (listFile.length === 0) {
            console.log('Kh??ng c?? file n??o ???????c upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                listUrl.push(fireBaseUrl);
                                setDataThem({
                                    ...dataThem,
                                    img: fireBaseUrl
                                });
                                setCountAnhDaUploadThanhCong_Phu(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Phu(listUrl);
    }

    const onEditorChange = (value) => {
        setDataTaoMoiSanPham({
            ...dataTaoMoiSanPham,
            moTa: value
        })
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    function KiemTraDuLieuNhap() {
        const regSo = /^[0-9\b]+$/;
        if (dataTaoMoiSanPham.ten === '' || dataTaoMoiSanPham.idCategory === '' || dataTaoMoiSanPham.idBrand === '' || dataTaoMoiSanPham.noiSanXuat === ''
            || dataTaoMoiSanPham.moTaNganGon.length === 0 || dataTaoMoiSanPham.img.chinh === '' || dataTaoMoiSanPham.gia === 0 || dataTaoMoiSanPham.soLuong === 0) {
            message.error('Th??ng tin t???o m???i s???n ph???m kh??ng h???p l???. Vui l??ng ki???m tra l???i');
        } else {
            if (!dataTaoMoiSanPham.gia.toString().match(regSo)) {
                message.error('Gi?? g???c kh??ng h???p l???')
            } else {
                if (!dataTaoMoiSanPham.giaTriGiamGia.toString().match(regSo)) {
                    message.error('Gi?? tr??? gi???m gi?? kh??ng h???p l???')
                } else {
                    if (!dataTaoMoiSanPham.soLuong.toString().match(regSo)) {
                        message.error('Gi?? tr??? s??? l?????ng s???n ph???m kh??ng h???p l???')
                    } else {
                        // message.success('ok')
                        ThemSanPham();
                    }
                }
            }
        }
    }

    function KiemTraDuLieuNhapThemMoiThuongHieu() {
        if (dataThem.ten === '' || dataThem.xuatXu === '') {
            message.error('D??? li???u th??m m???i th????ng hi???u kh??ng h???p l???. Vui l??ng ki???m tra l???i');
        } else {
            ThemBrand();
        }
    }

    async function LayDataCategoryAll() {
        let resData = await axios.get('hethong/categorys');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
        } else {
            message.error("L???y data danh m???c th???t b???i");
        }
    }

    async function LayDataBrandAll() {
        let resData = await axios.get('hethong/brands');
        if (resData.data.status === 'success') {
            setDataBrand(resData.data.data);
        } else {
            message.error("L???y data th????ng hi???u th???t b???i");
        }
    }

    async function LayDataCountriesAll() {
        let resData = await axios.get('hethong/countries');
        if (resData.data.status === 'success') {
            setDataCountries(resData.data.data);
        } else {
            message.error("L???y data Countries th???t b???i");
        }
    }

    async function ThemBrand() {
        let res = await axios.post('hethong/brands-them', {
            ten: dataThem.ten,
            xuatXu: dataThem.xuatXu,
            img: dataThem.img,
        });

        if (res.data.status === 'success') {
            message.success("Th??m th??nh c??ng danh m???c m???i");
            setSpinnerBrand(true);
            setShowModalTaoMoiBrand(false);
        } else {
            message.error(res.data.message);
            setShowModalTaoMoiBrand(false);
        }
    }

    async function ThemSanPham() {
        let res = await axios.post('hethong/products-them-chushop', {
            phanLoai: {
                mauSac: {
                    mauSac1: dataPhanLoai.mauSac.mauSac1,
                    mauSac2: dataPhanLoai.mauSac.mauSac2,
                    mauSac3: dataPhanLoai.mauSac.mauSac3,
                    mauSac4: dataPhanLoai.mauSac.mauSac4
                },
                size: {
                    size1: dataPhanLoai.size.size1,
                    size2: dataPhanLoai.size.size2,
                    size3: dataPhanLoai.size.size3,
                    size4: dataPhanLoai.size.size4,
                }
            },
            ten: dataTaoMoiSanPham.ten.trim(),
            img: {
                chinh: dataTaoMoiSanPham.img.chinh,
                phu: dataTaoMoiSanPham.img.phu,
                moTaChiTiet: dataTaoMoiSanPham.img.moTaChiTiet
            },
            gia: dataTaoMoiSanPham.gia,
            noiSanXuat: dataTaoMoiSanPham.noiSanXuat,
            moTa: dataTaoMoiSanPham.moTa,
            moTaNganGon: dataTaoMoiSanPham.moTaNganGon,
            soSao: dataTaoMoiSanPham.soSao,
            giaTriGiamGia: dataTaoMoiSanPham.giaTriGiamGia,
            soLuong: dataTaoMoiSanPham.soLuong,
            thongTinBaoHanh: {
                baoHanh: dataTaoMoiSanPham.thongTinBaoHanh.baoHanh,
                loaiBaoHanh: dataTaoMoiSanPham.thongTinBaoHanh.loaiBaoHanh,
                thoiGianBaoHanh: dataTaoMoiSanPham.thongTinBaoHanh.thoiGianBaoHanh,
                donViBaoHanh: dataTaoMoiSanPham.thongTinBaoHanh.donViBaoHanh
            },
            ngayTao: dataTaoMoiSanPham.ngayTao,
            idBrand: dataTaoMoiSanPham.idBrand,
            idCategory: dataTaoMoiSanPham.idCategory,
            idShop: dataTaoMoiSanPham.idShop,
            idEvent: dataTaoMoiSanPham.idEvent,
            isAccept: dataTaoMoiSanPham.isAccept,
            isLock: dataTaoMoiSanPham.isLock,
            isDelete: dataTaoMoiSanPham.isDelete
        });

        if (res.data.status === 'success') {
            message.success("Th??m th??nh c??ng");
            window.location.reload();
        } else {
            message.error(res.data.message);
        }
    }

    useEffect(() => {
        LayDataCategoryAll();
        LayDataBrandAll();
        LayDataCountriesAll();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setDataTaoMoiSanPham({
            ...dataTaoMoiSanPham,
            idShop: shopID
        })
    }, [shopID]);

    useEffect(() => {
        if (spinnerBrand === true) {
            LayDataBrandAll();
            setSpinnerBrand(false);
        }
    }, [spinnerBrand]);


    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                message.error('Vui l??ng ch???n ???nh cho Th????ng hi???u')
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    message.success('Upload ???nh th????ng hi???u th??nh c??ng');
                }
            }
        }
    }, [countAnhDaUploadThanhCong])

    useEffect(() => {
        if (firstTime3 === false) {
            if (imageAsFile_Chinh.length === 0) {
                message.error('Vui l??ng ch???n ???nh ch??nh cho s???n ph???m')
            } else {
                if (countAnhDaUploadThanhCong_Chinh === imageAsFile_Chinh.length) {
                    message.success('Upload ???nh ch??nh cho s???n ph???m th??nh c??ng');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Chinh])

    useEffect(() => {
        if (firstTime4 === false) {
            if (imageAsFile_Phu.length === 0) {
                message.error('Vui l??ng ch???n ???nh ph??? cho s???n ph???m')
            } else {
                if (countAnhDaUploadThanhCong_Phu === imageAsFile_Phu.length) {
                    message.success('Upload c??c ???nh ph??? cho s???n ph???m th??nh c??ng');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Phu])

    return (
        <Fragment>

            {/* MODAL TH??M TH????NG HI???U M???I */}
            <Modal show={showModalTaoMoiBrand} size="lg" animation={false} onHide={() => {
                setShowModalTaoMoiBrand(false);
            }}>
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    style={{ padding: 40 }}>
                    <Form.Item
                        label="T??n"
                        name="ten"
                        rules={[{ required: true, message: 'Vui l??ng nh???p t??n th????ng hi???u ' }]}>
                        <Input onChange={(e) => {
                            setDataThem({
                                ...dataThem,
                                ten: e.target.value
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Xu???t x???"
                        name="xuatxu"
                        rules={[{ required: true, message: 'Vui l??ng ch???n xu???t x???' }]}
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Ch???n xu???t x???"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(value) => {
                                setDataThem({
                                    ...dataThem,
                                    xuatXu: value
                                })
                            }}
                        >
                            {
                                dataCountries.map((item, i) => {
                                    return <Option key={item._id} value={item.name}>
                                        {item.name}
                                    </Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="???nh ?????i di???n"
                        name="username">
                        <div className='row' style={{ marginLeft: 2 }}>
                            <input type='file' accept="image/*"
                                onChange={(e) => {
                                    handleChange(e);
                                    setCountAnhDaUploadThanhCong(0);
                                    setFirstTime(false);
                                }}>
                            </input>
                        </div>
                    </Form.Item>

                    <Form.Item
                        name='showanhdaidien'
                        label="Show ???nh ?????i di???n">
                        {
                            imageAsUrl.map((src, i) => {
                                return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'???nh ' + i} width='200' height='150'></img>
                            })
                        }
                    </Form.Item>

                    <Form.Item
                        name='buttontaomoibrand'>
                        <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                            KiemTraDuLieuNhapThemMoiThuongHieu();
                        }}>T???o M???i</Button>
                    </Form.Item>
                </Form>
            </Modal>


            {/* MODAL TH??M PH??N LO???I */}
            <Modal show={showModalTaoPhanLoai} size="lg" animation={false} onHide={() => {
                setShowModalTaoPhanLoai(false);
            }}>
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    style={{ padding: 40 }}>

                    <Form.Item
                        label="M??u s???c"
                        name="mausac">
                        <div className='row'>
                            <Input placeholder='VD: Xanh' defaultValue={dataPhanLoai.mauSac.mauSac1} style={{ width: 150 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac1: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='?????' defaultValue={dataPhanLoai.mauSac.mauSac2} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac2: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='T??m' defaultValue={dataPhanLoai.mauSac.mauSac3} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac3: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='V??ng' defaultValue={dataPhanLoai.mauSac.mauSac4} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac4: e.target.value
                                    }
                                })
                            }}></Input>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="K??ch th?????c"
                        name="kichthuoc">
                        <div className='row'>
                            <Input placeholder='VD: L' defaultValue={dataPhanLoai.size.size1} style={{ width: 150 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size1: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='XL' defaultValue={dataPhanLoai.size.size2} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size2: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='35' defaultValue={dataPhanLoai.size.size3} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size3: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='36' defaultValue={dataPhanLoai.size.size4} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size4: e.target.value
                                    }
                                })
                            }}></Input>
                        </div>
                    </Form.Item>

                    <Form.Item
                        name='luuphanloai'>
                        <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                            setShowModalTaoPhanLoai(false);
                        }}>L??u</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="T???o m???i s???n ph???m">
                    <div className='col'>
                        <h3>Ph???n th??ng tin s???n ph???m</h3>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="T??n s???n ph???m"
                                name="ten"
                                rules={[{ required: true, message: 'Vui l??ng nh???p t??n s???n ph???m' }]}
                            >
                                <Input onChange={(e) => {
                                    setDataTaoMoiSanPham({
                                        ...dataTaoMoiSanPham,
                                        ten: e.target.value
                                    })
                                }} />
                            </Form.Item>

                            <Form.Item
                                label="Danh m???c"
                                name="danhmuc"
                                rules={[{ required: true, message: 'Vui l??ng ch???n danh m???c' }]}
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Ch???n danh m???c"
                                    onChange={(value) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            idCategory: value
                                        })
                                    }}
                                >
                                    {
                                        dataCategory.map((item, i) => {
                                            var result = item.idParen === '' ? (
                                            <Option key={item._id} value={item._id}>
                                                {item.ten}
                                            </Option>
                                            ) : ''
                                            return result;
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Lo???i s???n ph???m"
                                name="loaisanpham"
                                rules={[{ required: false, message: 'Vui l??ng ch???n danh m???c' }]}
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Ch???n lo???i s???n ph???m"
                                    onChange={(value) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            idCategory: value
                                        })
                                    }}
                                >
                                    {
                                        dataCategory.map((item, i) => {
                                            var result = item.idParen !== '' ? (
                                            <Option key={item._id} value={item._id}>
                                                {item.ten}
                                            </Option>
                                            ) : ''
                                            return result;
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Th????ng hi???u"
                                name="thuonghieu"
                                rules={[{ required: true, message: 'Vui l??ng ch???n th????ng hi???u' }]}
                            >
                                {
                                    spinnerBrand === true && (
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    )
                                }

                                {
                                    spinnerBrand === false && (
                                        <Fragment>
                                            <Select
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                style={{ width: '100%' }}
                                                placeholder="Ch???n th????ng hi???u"
                                                onChange={(value) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        idBrand: value
                                                    })
                                                }}
                                            >
                                                {
                                                    dataBrand.map((item, i) => {
                                                        return <Option key={item._id} value={item._id}>
                                                            {item.ten}
                                                        </Option>
                                                    })
                                                }
                                            </Select>
                                            <span>(Kh??ng t??m th???y th????ng hi???u ph?? h???p ? <Link to='' onClick={(e) => {
                                                e.preventDefault();
                                                setShowModalTaoMoiBrand(true);
                                            }}>T???o m???i</Link>)</span>
                                        </Fragment>
                                    )
                                }

                            </Form.Item>

                            <Form.Item
                                label="N??i s???n xu???t"
                                name="noisanxuat"
                                rules={[{ required: true, message: 'Vui l??ng ch???n n??i s???n xu???t' }]}
                            >
                                <Select
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{ width: '100%' }}
                                    placeholder="Ch???n n??i s???n xu???t"
                                    onChange={(value) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            noiSanXuat: value
                                        })
                                    }}
                                >
                                    {
                                        dataCountries.map((item, i) => {
                                            return <Option key={item._id} value={item.name}>
                                                {item.name}
                                            </Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="?????c ??i???m n???i b???t"
                                name="dacdiemnoibat"
                                rules={[{ required: true }]}
                            >
                                <Form.List name="dacdiemnoibat">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <div>
                                                {fields.map((field, index) => (
                                                    <Form.Item
                                                        name={'phandacdiemnoibat' + field.name}
                                                        required={false}
                                                        key={field.key}
                                                    >
                                                        <Form.Item
                                                            name={'dacdiemnoibat' + field.name}
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    whitespace: true,
                                                                    message: "Vui l??ng nh???p ?????c ??i???m n???i b???t ho???c x??a n??",
                                                                },
                                                            ]}
                                                            noStyle
                                                        >
                                                            <Input placeholder={'?????c ??i???m ' + (index + 1)} style={{ width: '95%' }}
                                                                onBlur={(e) => {
                                                                    if (e.target.value !== dataTaoMoiSanPham.moTaNganGon[index]) {
                                                                        var newArray = dataTaoMoiSanPham.moTaNganGon;
                                                                        newArray[index] = e.target.value
                                                                        setDataTaoMoiSanPham({
                                                                            ...dataTaoMoiSanPham,
                                                                            moTaNganGon: newArray
                                                                        })
                                                                    }
                                                                }} />
                                                        </Form.Item>
                                                        {fields.length > 1 ? (
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                style={{ margin: '0 8px' }}
                                                                onClick={() => {
                                                                    remove(field.name);
                                                                    dataTaoMoiSanPham.moTaNganGon.splice(parseInt(field.name), 1);
                                                                }}
                                                            />
                                                        ) : null}
                                                    </Form.Item>
                                                ))}
                                                <Form.Item
                                                    name='buttonthemdacdiemnoibat'>
                                                    <Button
                                                        type="dashed"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            add();
                                                        }}
                                                        style={{ width: '95%' }}
                                                    >
                                                        <PlusOutlined /> Th??m ?????c ??i???m n???i b???t
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        );
                                    }}
                                </Form.List>
                            </Form.Item>

                            <Form.Item
                                label="M?? t??? chi ti???t"
                                name="motachitiet">
                                <QuillEditor
                                    placeholder={"Nh???p n???i dung"}
                                    onEditorChange={onEditorChange}
                                    onFilesChange={onFilesChange}
                                />
                            </Form.Item>




                            <Form.Item
                                label="???nh ch??nh "
                                name="anhchinh"
                                rules={[{ required: true, message: 'Vui l??ng ch???n ???nh' }]}>
                                <input type='file' accept="image/*"
                                    onChange={(e) => {
                                        handleChangeIMG_Chinh(e);
                                        setCountAnhDaUploadThanhCong_Chinh(0);
                                        setFirstTime3(false);
                                    }}>
                                </input>
                            </Form.Item>

                            <Form.Item
                                name='showanhchinh'
                                label="Show ???nh ch??nh">
                                {
                                    imageAsUrl_Chinh.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'???nh ' + i} width='200' height='150'></img>
                                    })
                                }
                            </Form.Item>

                            <Form.Item
                                label="???nh ph???"
                                name="anhphu">
                                <input type='file' accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        handleChangeIMG_Phu(e);
                                        setCountAnhDaUploadThanhCong_Phu(0);
                                        setFirstTime4(false);
                                    }}>
                                </input>
                            </Form.Item>

                            <Form.Item
                                name='showanhphu'
                                label="Show c??c ???nh ph???">
                                {
                                    imageAsUrl_Phu.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'???nh ' + i} width='200' height='150'></img>
                                    })
                                }
                            </Form.Item>
                        </Form>
                        <br></br>
                        <h3>Ph???n th??ng tin b??n h??ng</h3>
                        <Form {...layout}>
                            <Form.Item
                                label="Gi?? g???c"
                                name="giagoc"
                                rules={[{ required: true, message: 'Vui l??ng nh???p gi?? g???c s???n ph???m' }]}>
                                <Input
                                    onChange={(e) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            gia: parseInt(e.target.value)
                                        })
                                    }}></Input>
                            </Form.Item>

                            <Form.Item
                                label="Gi?? tr??? gi???m"
                                name="giatrigiam">
                                <Input defaultValue={0}
                                    onChange={(e) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            giaTriGiamGia: parseInt(e.target.value)
                                        })
                                    }}></Input>(N???u gi?? tr??? nh???p nh??? h??n 100 th?? h??? th???ng s??? t??? ?????ng gi???m theo %)
                            </Form.Item>

                            <Form.Item
                                label="S??? l?????ng s???n ph???m"
                                name="soluong"
                                rules={[{ required: true, message: 'Vui l??ng nh???p s??? l?????ng s???n ph???m' }]}>
                                <Input
                                    onChange={(e) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            soLuong: parseInt(e.target.value)
                                        })
                                    }}></Input>
                            </Form.Item>

                            <Form.Item
                                label="M??u s???c, k??ch th?????c"
                                name="mausackichthuoc">
                                <Button onClick={() => {
                                    setShowModalTaoPhanLoai(true);
                                }}>Th??m ph??n lo???i</Button>
                            </Form.Item>

                            <Form.Item
                                label="B???o h??nh"
                                name="baohanh">
                                <Select style={{ width: '100%' }}
                                    defaultValue={0}
                                    onChange={(value) => {
                                        if (value === 1) {
                                            setDisableFieldBaoHanh(true);
                                            setDataTaoMoiSanPham({
                                                ...dataTaoMoiSanPham,
                                                thongTinBaoHanh: {
                                                    baoHanh: false,
                                                    donViBaoHanh: '',
                                                    loaiBaoHanh: '',
                                                    thoiGianBaoHanh: ''
                                                }
                                            })
                                        }

                                        if (value === 0) {
                                            setDisableFieldBaoHanh(false);
                                            setDataTaoMoiSanPham({
                                                ...dataTaoMoiSanPham,
                                                thongTinBaoHanh: {
                                                    baoHanh: true,
                                                    donViBaoHanh: '',
                                                    loaiBaoHanh: '',
                                                    thoiGianBaoHanh: ''
                                                }
                                            })
                                        }
                                    }}>
                                    <Option value={0}>C??</Option>
                                    <Option value={1}>Kh??ng</Option>
                                </Select>
                            </Form.Item>

                            {
                                dataTaoMoiSanPham.thongTinBaoHanh.baoHanh === true && (
                                    <Fragment>
                                        <Form.Item
                                            label="Th???i gian b???o h??nh"
                                            name="thoigianbaohanh"
                                            rules={[{ required: true, message: 'Vui l??ng nh???p th???i gian b???o h??nh' }]}>
                                            <Input disabled={disableFieldBaoHanh}
                                                onChange={(e) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        thongTinBaoHanh: {
                                                            ...dataTaoMoiSanPham.thongTinBaoHanh,
                                                            thoiGianBaoHanh: parseInt(e.target.value)
                                                        }
                                                    })
                                                }}></Input>
                                        </Form.Item>

                                        <Form.Item
                                            label="????n v??? th???i gian b???o h??nh"
                                            name="donvibaohanh"
                                            rules={[{ required: true, message: 'Vui l??ng nh???p ????n v??? th???i gian b???o h??nh' }]}>
                                            <Select style={{ width: '100%' }}
                                                defaultValue={0}
                                                disabled={disableFieldBaoHanh}
                                                onChange={(value) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        thongTinBaoHanh: {
                                                            ...dataTaoMoiSanPham.thongTinBaoHanh,
                                                            donViBaoHanh: value - 1
                                                        }
                                                    })
                                                }}>
                                                <Option disabled={true} value={0}>Ch???n ????n v??? th???i gian</Option>
                                                <Option value={1}>Th??ng</Option>
                                                <Option value={2}>N??m</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Lo???i b???o h??nh"
                                            name="loaibaohanh"
                                            rules={[{ required: true, message: 'Vui l??ng ch???n lo???i b???o h??nh' }]}>
                                            <Select style={{ width: '100%' }}
                                                defaultValue={0}
                                                disabled={disableFieldBaoHanh}
                                                onChange={(value) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        thongTinBaoHanh: {
                                                            ...dataTaoMoiSanPham.thongTinBaoHanh,
                                                            loaiBaoHanh: value - 1
                                                        }
                                                    })
                                                }}>
                                                <Option disabled={true} value={0}>Ch???n lo???i b???o h??nh</Option>
                                                <Option value={1}>B???o h??nh ch??nh h??ng</Option>
                                                <Option value={2}>B???o h??nh b???i shop th??ng qua OneUp</Option>
                                            </Select>
                                        </Form.Item>
                                    </Fragment>
                                )
                            }
                        </Form>
                    </div>

                    <Form {...layout}>
                        <Form.Item {...tailLayout}
                            name='buttontaomoisanpham'>
                            <Button
                                style={{ width: 200 }}
                                onClick={() => {
                                    KiemTraDuLieuNhap();
                                }}
                                onMouseOver={() => {
                                    setDataTaoMoiSanPham({
                                        ...dataTaoMoiSanPham,
                                        img: {
                                            chinh: imageAsUrl_Chinh[0],
                                            phu: imageAsUrl_Phu
                                        }
                                    })
                                }}>T???o m???i</Button>
                        </Form.Item>

                        {/* <Form.Item {...tailLayout}
                            name='buttontest'>
                            <Button
                                onClick={() => {
                                    console.log(dataTaoMoiSanPham)
                                    console.log(dataPhanLoai);
                                }}
                                onMouseOver={() => {
                                    setDataTaoMoiSanPham({
                                        ...dataTaoMoiSanPham,
                                        img: {
                                            chinh: imageAsUrl_Chinh[0],
                                            phu: imageAsUrl_Phu
                                        }
                                    })
                                }}>Test</Button>
                        </Form.Item> */}
                    </Form>
                </TabPane>
            </Tabs>
        </Fragment >
    )
}
