/*
 * @Author: 郑义进
 * @Date: 2020-06-02 10:01:08
 * @LastEditTime: 2020-06-11 14:00:23
 * @LastEditors:  
 * @Description: 混入
 * @FilePath: \lwbzzm-frontend\src\assets\static\mixin.js
 */

let mixin = {
    methods: {
        // 返回上一步
        onClickLeft() {
            this.$router.go(-1);
        },
        //隐藏工种类型弹出层并赋值
        workTypeConfirm(value) {

            if (value) {
                this.workList.push(value);
            }
            this.workType = this.workList.join(',')
            this.workTypeShow = false;
        },
        //关闭工种选择窗
        closeWorkShow(val) {
            this.workTypeShow = val;
        },

        //选择工种后确认
        confirmOK(obj) {
            this.workTypeShow = obj.close;
            this.workType = obj.workType;
        },

        //校验手机号码
        validator(val) {
            return /^1[3|4|5|8|9][0-9]\d{4,8}$/.test(val);
        },

        //校验身份证
        pidValidator(val) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
        },

        //邮箱校验
        emailValidator(val){
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)
        }
    }
}

export default mixin