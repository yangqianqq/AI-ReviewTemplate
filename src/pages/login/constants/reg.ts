// 手机号码验证
export const PHONE_NUMBER_REG = /^1[3456789]\d{9}$/gi;
// 手机号码验证: 包含第二位0，1，2的号码
export const Phone_Number_Reg = /^1[0-9]{10}$/gi;
// 密码验证： 8-20位数字加字母
// export const PASSWORD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/gi;
export const PASSWORD_REG = /^[^\s]{8,20}$/gi;
// 密码验证： 数字，大小写字母至少包含两种
export const PassWord_Reg =
    /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/gi;
// 验证密码文本
export const PHONE_NUMBER_REG_TEXT = '请输入正确的11位手机号码';
export const PASSWORD_REG_TEXT = '请输入至少8位含数字和字母的密码';
