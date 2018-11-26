/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */
;layui.define(["table", "form"], function (e) {
    var t = layui.$, i = layui.table,
        f = layui.form, admin = layui.admin;
    i.render({
        id: "id",
        elem: "#LAY-user-manage",
        url: "/user/list",
        cols: [[{type: "checkbox", fixed: "left"},
            {field: "name", title: "用户名", minWidth: 100},
            {field: "photo", title: "头像", width: 100, templet: "#imgTpl"},
            {field: "phone", title: "手机"},
            {field: "email", title: "邮箱"},
            {field: "level", width: 80, title: "等级"},
            {field: "ip", title: "IP"},
            {field: "registTime", title: "加入时间", sort: !0},
            {title: "操作", width: 150, align: "center", fixed: "right", toolbar: "#table-useradmin-webuser"}
        ]],
        page: !0,
        limit: 30,
        height: "full-220",
        text: "对不起，加载出现异常！"
    }),
        i.on("tool(LAY-user-manage)", function (e) {
            var id = e.data['id'];
            if ("del" === e.event) layer.prompt({formType: 1, title: "敏感操作，请验证口令"}, function (t, i) {
                layer.close(i), layer.confirm("真的删除行么", function (t) {
                    e.del(), layer.close(t)
                })
            }); else if ("edit" === e.event) {
                t(e.tr);
                layer.open({
                    type: 2,
                    title: "编辑用户",
                    content: "/user/user/update.html",
                    maxmin: !0,
                    area: ["500px", "450px"],
                    btn: ["确定", "取消"],
                    yes: function (e, t) {
                        var l = window["layui-layer-iframe" + e],
                            r = "LAY-user-front-submit",
                            n = t.find("iframe").contents().find("#" + r);
                        l.layui.form.on("submit(" + r + ")", function (t) {
                            admin.req({
                                url: '/user/update',
                                data: t.field,
                                done: function (res) {
                                    i.reload("LAY-user-front-submit"), layer.close(e);
                                }
                            });
                        }), n.trigger("click")
                    },
                    success: function (e, t) {
                        admin.req({
                            url: '/user/user/' + id,
                            data: '',
                            done: function (res) {
                                var json = eval(res);
                                var body = layui.layer.getChildFrame('body', t);
                                body.find("input[name='id']").val(json.data.id);
                                body.find("input[name='name']").val(json.data.name);
                                body.find("input[name='phone']").val(json.data.phone);
                                body.find("input[name='email']").val(json.data.email);
                                body.find("input[name='photo']").text(json.data.photo);
                                f.render();
                            }
                        });
                    }
                })
            }
        }),
        i.render({
            elem: "#LAY-user-back-manage",
            url: layui.setter.base + "json/useradmin/mangadmin.js",
            cols: [[{type: "checkbox", fixed: "left"},
                {field: "id", width: 80, title: "ID", sort: !0},
                {field: "loginname", title: "登录名"},
                {field: "telphone", title: "手机"},
                {field: "email", title: "邮箱"},
                {field: "role", title: "角色"},
                {field: "jointime", title: "加入时间", sort: !0},
                {field: "check", title: "审核状态", templet: "#buttonTpl", minWidth: 80, align: "center"},
                {title: "操作", width: 150, align: "center", fixed: "right", toolbar: "#table-useradmin-admin"}]],
            text: "对不起，加载出现异常！"
        }), i.on("tool(LAY-user-back-manage)", function (e) {
        e.data;
        if ("del" === e.event) layer.prompt({formType: 1, title: "敏感操作，请验证口令"}, function (t, i) {
            layer.close(i), layer.confirm("确定删除此管理员？", function (t) {
                console.log(e), e.del(), layer.close(t)
            })
        }); else if ("edit" === e.event) {
            t(e.tr);
            layer.open({
                type: 2,
                title: "编辑管理员",
                content: "../../../views/user/administrators/adminform.html",
                area: ["420px", "420px"],
                btn: ["确定", "取消"],
                yes: function (e, t) {
                    var l = window["layui-layer-iframe" + e], r = "LAY-user-back-submit",
                        n = t.find("iframe").contents().find("#" + r);
                    l.layui.form.on("submit(" + r + ")", function (t) {
                        t.field;
                        i.reload("LAY-user-front-submit"), layer.close(e)
                    }), n.trigger("click")
                },
                success: function (e, t) {
                }
            })
        }
    }), i.render({
        elem: "#LAY-user-back-role",
        url: layui.setter.base + "json/useradmin/role.js",
        cols: [[{type: "checkbox", fixed: "left"},
            {field: "id", width: 80, title: "ID", sort: !0},
            {field: "rolename", title: "角色名"},
            {field: "limits", title: "拥有权限"},
            {field: "descr", title: "具体描述"},
            {title: "操作", width: 150, align: "center", fixed: "right", toolbar: "#table-useradmin-admin"}]],
        text: "对不起，加载出现异常！"
    }), i.on("tool(LAY-user-back-role)", function (e) {
        e.data;
        if ("del" === e.event) layer.confirm("确定删除此角色？", function (t) {
            e.del(), layer.close(t)
        }); else if ("edit" === e.event) {
            t(e.tr);
            layer.open({
                type: 2,
                title: "编辑角色",
                content: "../../../views/user/administrators/roleform.html",
                area: ["500px", "480px"],
                btn: ["确定", "取消"],
                yes: function (e, t) {
                    var l = window["layui-layer-iframe" + e],
                        r = t.find("iframe").contents().find("#LAY-user-role-submit");
                    l.layui.form.on("submit(LAY-user-role-submit)", function (t) {
                        t.field;
                        i.reload("LAY-user-back-role"), layer.close(e)
                    }), r.trigger("click")
                },
                success: function (e, t) {
                }
            })
        }
    }), e("useradmin", {})
})
;