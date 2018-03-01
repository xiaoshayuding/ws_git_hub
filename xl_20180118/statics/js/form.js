//通用表单验证	

function check_frm(formid) {
	var flag = true,
		ipt_obj = $('#'+formid).find('input');
		ipt_obj.each(function(index,obj){
			var thisobj = $(this);
			switch(thisobj.attr('name')) {
				case 'info[name]':
					if(thisobj.val()==''){
						alert('姓名不能为空');
						flag =  false;
						return false;
					}else{
						var rel = new RegExp("^[\u4e00-\u9fa5]{2,4}$"); 
						if (!rel.test(thisobj.val())){ 
							alert("姓名格式有误"); 
							flag =  false;
							return false;
						} 
					}
					break;
				case 'info[mobile]':
					if(thisobj.val()==''){
						alert('电话不能为空');
						flag =  false;
						return false;
					}else if(thisobj.val().length < 11){
						alert('电话不能少于11位');
						flag =  false;
						return false;
					}else{
						var rel = new RegExp("^(1)[0-9]{10}$");
						if(!rel.test(thisobj.val()))
						{
							alert('电话格式不正确');
							flag =  false;
							return false;
						}
					}
					break;
				case 'info[E_mail]':
					if(thisobj.val()==''){
						alert('邮箱不能为空');
						flag =  false;
						return false;
					}
					break;
			}
		});
		if(flag == false) return false;
		return true;
}
/**
 * formid 表单ID
 * idval  formid的值
 * is_ajax 是否AJAX请求: true/false
 * alert_custom 是否自定义alert: true/false
 * num 图片编号：结合alert_custom使用
 * alert_service 是否弹出客服页面: true/false
 * showResult 是否展示反馈结果
*/

function ajaxPutData(formid,idval,is_ajax,showResult)
{
    var is_ajax = is_ajax || false;
    var flag = true;
    var showResult = showResult || false;
    if(check_frm(formid)==false) return false;
    var methodOfStudyh2 = '',
        methodOfStudyh3 = '';
    var methodStr = $("#"+ formid +" input[name='info[method]']:checked").val();
    if (methodStr == "免考免学" || methodStr == "在家自学" || methodStr == "其他") {
        methodOfStudyh2 = "网络教育的";
        methodOfStudyh3 = "广东开放大学、中国石油大学。";
    } else if (methodStr == "学校听课") {
        methodOfStudyh3 = "自考的深圳大学、华南师范大学。";
    }else if (methodStr == "辅导教学") {
        methodOfStudyh2 = "成人高考的";
        methodOfStudyh3 = "江西师范大学、北京信息科技大学。";
    }else{
        methodOfStudyh2 = "";
        methodOfStudyh3 = "";
    }

    if(is_ajax==true)
        $.post('http://www.gdzp.org/index.php?m=formguide&c=index&a=show&formid='+idval+'&siteid=1',$('#'+formid).serialize(),function(rs){
            if(rs.status == 0){showMsg(false,rs.msg);return false;}
            if(rs.status == 1){
                document.getElementById(formid).reset();
                $(this).parents('.modal').hide();
                if(showResult){
                    showMsg(true,'请保持手机畅通<br/>2个工作日内会有专业老师与您联系！',true,methodOfStudyh2,methodOfStudyh3);
                }else{
                    showMsg(true,'请保持手机畅通<br/>2个工作日内会有专业老师与您联系！',false);
                }
                return 1;
            }
        },'json');
}


/*
* re: boolean  提交是否成功，是为true
* ya: boolean  是够根据提交的内容显示用户的结果  true为显示
* methodOfStudyh2：推荐考试方式
* methodOfStudyh3： 推荐院校
* msg：提交后的提示
* */
function showMsg(re,msg,ya,methodOfStudyh2,methodOfStudyh3)
{   var msg=msg||"测试结果将会1~3日内通知您！";
    var re = re ? '提交成功！' : '提交失败！';

    if(ya){
        $('#apply-return .result').show();
        re = '推荐方案';
        msg = '感谢您的支持，稍后将有专业的课程顾问与您取得联系，请保持电话通畅.';
    }else{
        $('#apply-return .result').hide();
    }
    var $respondH2 = $('#respond-h2'),
        $respondP = $('#respond-p'),
        $resultH2 = $('#resut-cat'),
        $resultYard = $('#resut-yard');

    $respondH2.text(re);
    $resultH2.text(methodOfStudyh2);
    $resultYard.text(methodOfStudyh3);
    $respondP.html(msg);
    $('#layer').show();
    $('#layer').find('.modal').last().show().siblings().hide();
}

/**
 * 自定义alert
*/

function formatDate (strTime,sepStr) {
	var strTime = strTime || new Date();
	var sepStr = sepStr || '';
    var date = new Date(strTime);
    return date.getFullYear()+sepStr+(date.getMonth()+1)+sepStr+date.getDate();
}
