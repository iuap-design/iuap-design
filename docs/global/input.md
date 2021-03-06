## 输入框


### 基础
在普通的input元素上添加`u-form-control`样式

<div class="examples-code"><pre><code>
&lt;input type="text" class="u-form-control" id="exampleInput3"  placeholder="jane.doe@example.com"></code></pre>
</div>





### 禁止输入
在普通输入框中添加`disabled` 属性

<div class="examples-code"><pre><code>
&lt;input type="text" class="u-form-control" id="exampleInput3" disabled placeholder="jane.doe@example.com">
</code></pre>
</div>





### 带后缀

<div class="examples-code"><pre><code>
&lt;div class="u-input-group u-has-feedback">
    &lt;input type="email" class="u-form-control" placeholder="jane.doe@example.com">
    &lt;span class="u-form-control-feedback uf uf-search-light-2">&lt;/span>
&lt;/div></code></pre>
</div>





### 必输项
当input框失去焦点时，校验输入的内容，如果内容长度大于0则隐藏必输字符`*`,否则显示

<div class="examples-code"><pre><code>
&lt;div class="u-form-group">
    &lt;label for="exampleInput3">必输:&lt;/label>
    &lt;div class="u-input-group u-has-feedback must-in">
        &lt;div class="u-input-group-before " style="color: red;">*&lt;/div>
        &lt;input type="text" class="u-form-control" id="exampleInput3" placeholder="jane.doe@example.com">
        &lt;span class="u-form-control-feedback uf uf-search-light-2">&lt;/span>
    &lt;/div>
&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
var mustinDom=document.querySelectorAll('.must-in input');
var mustinlen=mustinDom.length;
var checkInput=function(){
    //console.log(this+'---'+this.previousSibling+'----'+this.previousSibling.innerHTML);
    if(this.value.length>0){
        this.previousElementSibling.innerHTML='';
    }else{
        this.previousElementSibling.innerHTML='*';
    }
}
if(mustinlen>0){
    for(var i=0;i< mustinlen;i++){
        u.on(mustinDom[i],'blur',checkInput);
        u.on(mustinDom[i],'keydown',function(){
        	this.previousElementSibling.innerHTML='';
        });
    }
}
</code></pre>

