/**
 * Module : Sparrow base component
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 18:45:08
 */

import {
    Class
} from 'tinper-sparrow/src/class';
import {
    isDomElement
} from 'tinper-sparrow/src/util';
import {
    on,
    off
} from 'tinper-sparrow/src/event';


var BaseComponent = Class.create({
    initialize: function(element) {
        if (isDomElement(element)) {
            this.element = element;
            this.options = {};
        } else {
            this.element = element['el'];
            this.options = element;
        }
        this.element = typeof this.element === 'string' ? document.querySelector(this.element) : this.element;

        this.compType = this.compType || this.constructor.compType;
        this.element[this.compType] = this;
        this.element['init'] = true;
        this.init();
    },
    /**
     * 绑定事件
     * @param {String} name
     * @param {Function} callback
     */
    on: function(name, callback) {
        name = name.toLowerCase()
        this._events || (this._events = {})
        var events = this._events[name] || (this._events[name] = [])
        events.push({
            callback: callback
        })
        return this;
    },
    /**
     * 触发事件
     * @param {String} name
     */
    trigger: function(name) {
        name = name.toLowerCase()
        if (!this._events || !this._events[name]) return this;
        var args = Array.prototype.slice.call(arguments, 1);
        var events = this._events[name];
        for (var i = 0, count = events.length; i < count; i++) {
            events[i].callback.apply(this, args);
        }
        return this;

    },
    triggerReturn: function(name) {
        name = name.toLowerCase()
        if (!this._events || !this._events[name]) return this;
        var args = Array.prototype.slice.call(arguments, 1);
        var events = this._events[name];
        var flag = true;
        for (var i = 0, count = events.length; i < count; i++) {
            flag = flag && events[i].callback.apply(this, args);
        }
        return flag;
    },
    /**
     * 初始化
     */
    init: function() {},
    /**
     * 渲染控件
     */
    render: function() {},
    /**
     * 销毁控件
     */
    destroy: function() {
        delete this.element['comp'];
        this.element.innerHTML = '';
    },
    /**
     * 增加dom事件
     * @param {String} name
     * @param {Function} callback
     */
    addDomEvent: function(name, callback) {
        on(this.element, name, callback)
        return this
    },
    /**
     * 移除dom事件
     * @param {String} name
     */
    removeDomEvent: function(name, callback) {
        off(this.element, name, callback);
        return this
    },
    setEnable: function(enable) {
        return this
    },
    /**
     * 判断是否为DOM事件
     */
    isDomEvent: function(eventName) {
        if (this.element['on' + eventName] === undefined)
            return false
        else
            return true
    },
    createDateAdapter: function(options) {
        var opt = options['options'],
            model = options['model'];
        if (u.compMgr) {
            var Adapter = u.compMgr.getDataAdapter(this.compType, opt['dataType']);
            if (Adapter) {
                this.dataAdapter = new Adapter(this, options);
            }
        }

    },
    Statics: {
        compName: '',
        EVENT_VALUE_CHANGE: 'valueChange',
        getName: function() {
            return this.compName
        }
    }
})

function adjustDataType(options) {
    var types = ['integer', 'float', 'currency', 'percent', 'string', 'textarea'];
    var _type = options['type'],
        _dataType = options['dataType'];
    if (types.indexOf(_type) != -1) {
        options['dataType'] = _type;
        options['type'] = 'originText';
    }
}


var BaseComponent = BaseComponent;
window.u = window.u || {};
window.u.BaseComponent = BaseComponent;

if (u.compMgr) {
    if (document.readyState && document.readyState === 'complete') {
        u.compMgr.updateComp();
    } else {
        on(window, 'load', function() {
            //扫描并生成控件
            u.compMgr.updateComp();
        });
    }
}


export {
    BaseComponent
};
