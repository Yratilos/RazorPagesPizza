"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var Tool = _defineProperty({
  /**
   * 导出Excel（Blob）
   * @param {string} methd 请求类型
   * @param {string} url 请求地址（注意参数需要编码后传递）
   * @param {string} fileName 文件名
   */
  exportExcel: function exportExcel(methd, url, fileName) {
    var oReq = new XMLHttpRequest();
    oReq.responseType = 'blob';
    oReq.open(methd, url);
    oReq.send();
    // 请求已完成，且响应已就绪
    oReq.onload = function (oEvent) {
      if (oReq.status >= 200 && oReq.status < 300) {
        var blob = oReq.response;
        var objectUrl = URL.createObjectURL(blob);
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display:none';
          a.href = objectUrl;
          a.download = fileName;
          a.click();
          URL.revokeObjectURL(objectUrl);
        }
      }
    };
  }
}, "exportExcel", function exportExcel(method, url) {
  var childs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  function createInput(dic) {
    var input = document.createElement('input');
    input.name = dic['Key'];
    input.value = dic['Value'];
    return input;
  }
  var form = document.createElement('form');
  form.action = url;
  form.enctype = 'multipart/form-data';
  form.method = method;
  if (childs.length > 0) {
    for (var i = 0; i < childs.length; i++) {
      form.appendChild(createInput(childs[i]));
    }
  }
  document.body.appendChild(form);
  form.submit();
  form.remove();
});