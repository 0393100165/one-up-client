import React, { Fragment, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { message } from 'antd';
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

export default function DangKyComponent() {
    const dataNgay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const dataThang = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const dataNam = [];
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const [cookies, setCookies] = useCookies();
    const dispatch = useDispatch()
    let maxOffset = 120;
    let thisYear = (new Date()).getFullYear();
    for (let x = 0; x <= maxOffset; x++) {
        dataNam.push(thisYear - x)
    }
    const [dataNgaySinh, setDataNgaySinh] = useState({
        ngay: 0,
        thang: -1,
        nam: 0
    })
    const [dataDangKy, setDataDangKy] = useState({
        ten: '',
        email: '',
        sdt: '',
        cmnd: '',
        ngaySinh: '',
        gioiTinh: '',
        matKhau: '',
        vaiTro: 2
    })


    function KiemTraDuLieuNhap(data) {
        const regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const regSDT = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-5])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (data.ten === '' || data.email === '' || data.sdt === '' || data.cmnd === '' || data.gioiTinh === '' || data.matKhau === '') {
            setStatusMessageError(0);
        } else {
            if (!regEmail.test(data.email)) {
                setStatusMessageError(1);
            } else {
                if (!regSDT.test(data.sdt)) {
                    setStatusMessageError(2);
                } else {
                    setStatusMessageError(-1);
                    KhoiTaoTaiKhoan();
                }
            }
        }
    }

    async function KhoiTaoTaiKhoan() {
        let res = await axios.post('hethong/auth/register', {
            ten: dataDangKy.ten,
            email: dataDangKy.email,
            sdt: dataDangKy.sdt,
            cmnd: dataDangKy.cmnd,
            ngaySinh: dataDangKy.ngaySinh,
            gioiTinh: dataDangKy.gioiTinh,
            taiKhoan: {
                tenTaiKhoan: dataDangKy.email,
                matKhau: dataDangKy.matKhau
            },
            vaiTro: 2,
            isLock: false,
            isDelete: false
        })

        if (res.data.status === 'success') {
            message.success(res.data.message);
            dispatch({ type: 'CLOSE_MODAL_DANGNHAP_DANGKY' });
        } else {
            dispatch({ type: 'CLOSE_MODAL_DANGNHAP_DANGKY' });
            message.error(res.data.message);
        }
    }

    useEffect(() => {
        setStatusMessageError(-1);
    }, [])

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-4" style={{ height: 'auto', padding: 40 }}>
                    <h3>????ng K??</h3>
                    <span style={{ color: 'grey' }}>T???o t??i kho???n ????? theo d??i ????n h??ng, l??u
                                    danh s??ch s???n ph???m y??u th??ch, nh???n nhi???u ??u ????i h???p d???n.</span>
                </div>
                <div className="col-sm-8" style={{ height: 'auto', padding: 40, borderLeft: 1 }}>
                    <Form>
                        <Form.Group as={Row} controlId="formBasicHoTen">
                            <Form.Label column sm={3}>H??? t??n</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nh???p h??? t??n" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        ten: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicSdt">
                            <Form.Label column sm={3}>S??T</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nh???p s??? ??i???n tho???i" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        sdt: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" placeholder="Nh???p email" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        email: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicCMND">
                            <Form.Label column sm={3}>Ch???ng minh th??</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nh???p ch???ng minh nh??n d??n" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        cmnd: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPass">
                            <Form.Label column sm={3}>M???t kh???u</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password" placeholder="Nh???p m???t kh???u" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        matKhau: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Gi???i t??nh</Form.Label>
                            <Col sm={9}>
                                <Row>
                                    <Form.Check type="radio" label="N???" name="radioGioiTinh" id="formHorizontalRadios2" style={{ marginLeft: 100 }} onClick={() => {
                                        setDataDangKy({
                                            ...dataDangKy,
                                            gioiTinh: 0
                                        })
                                    }} />
                                    <Form.Check type="radio" label="Nam" name="radioGioiTinh" id="formHorizontalRadios1" style={{ marginLeft: 15 }} onClick={() => {
                                        setDataDangKy({
                                            ...dataDangKy,
                                            gioiTinh: 1
                                        })
                                    }} />
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPass">
                            <Form.Label column sm={3}>Ng??y sinh</Form.Label>
                            <Col sm={9}>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Control as="select" value={dataNgaySinh.ngay} onChange={(e) => {
                                            setDataNgaySinh({
                                                ...dataNgaySinh,
                                                ngay: e.target.value
                                            })
                                        }}>
                                            <option value={0}>Ng??y</option>
                                            {
                                                dataNgay.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Control as="select" value={dataNgaySinh.thang} onChange={(e) => {
                                            setDataNgaySinh({
                                                ...dataNgaySinh,
                                                thang: e.target.value
                                            })
                                        }}>
                                            <option value={-1}>Th??ng</option>
                                            {
                                                dataThang.map((item, i) => {
                                                    return <option key={i} value={item}>{(item + 1).toString()}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Control as="select" value={dataNgaySinh.nam} onChange={(e) => {
                                            setDataNgaySinh({
                                                ...dataNgaySinh,
                                                nam: e.target.value
                                            })
                                        }}>
                                            <option value={0}>N??m</option>
                                            {
                                                dataNam.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}></Form.Label>
                            <Col sm={9}>
                                {
                                    statusMessageError === 0 && (
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>Th??ng tin ????ng k?? t??i kho???n kh??ng h???p l???. Vui l??ng ki???m tra l???i th??ng tin</p>
                                    )
                                }

                                {
                                    statusMessageError === 1 && (
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>D??? li???u email kh??ng h???p l???</p>
                                    )
                                }

                                {
                                    statusMessageError === 2 && (
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>D??? li???u s??? ??i???n tho???i kh??ng h???p l???</p>
                                    )
                                }

                                {
                                    statusMessageError === 3 && (
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>Email n??y ???? t???n t???i. Vui l??ng ch???n email kh??c</p>
                                    )
                                }

                                <Button variant="danger" block onMouseOver={() => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        ngaySinh: new Date(dataNgaySinh.nam, dataNgaySinh.thang, dataNgaySinh.ngay)
                                    })
                                }}
                                    onClick={() => {
                                        KiemTraDuLieuNhap(dataDangKy);
                                    }}>
                                    ????ng K??
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
