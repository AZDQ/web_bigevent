$(function () {
  //点击出现注册账户界面
  $('#link_reg').on("click", function () {
    $(this).parents('.login').hide().siblings(".register").show()
  })
  //点击出现登录界面
  $('#link_login').on("click", function () {
    $(this).parents('.register').hide().siblings(".login").show()
  })
  //自定义事件
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位,且不能出现空格'
    ],
    repass: function (value) {
      const repasval = $('.register [name=repassword]').val()
      if (repasval !== value) return '密码不一致'
    }
  })
  //发起注册ajax请求
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    // const msg = $(this).serialize()
    // console.log(msg);
    const data = {
      username: $('#form_reg [name=username]').val().trim(),
      password: $('#form_reg [name=password]').val().trim()
    }
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: data,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功')
        $('#link_login').click()
        $('#form_reg [name=username]').val('')
        $('#form_reg [name=password]').val('')
        $('#form_reg [name=repassword]').val('')
      }
    })
  })
  //监听登录表单的提交事件
  $('#form-login').on('submit', function (e) {
    e.preventDefault()
    const data = $(this).serialize()
    console.log(data);
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: data,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('登录成功')
        $('#form-login [name=username]').val('')
        $('#form-login [name=password]').val('')
        localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })
})