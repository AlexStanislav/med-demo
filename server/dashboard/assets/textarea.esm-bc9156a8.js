import{a3 as i,B as r,o as l,c as o,m as u,s as p}from"./index-519fe953.js";var z=i(),d=`
@layer primevue {
    .p-inputtextarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-fluid .p-inputtextarea {
        width: 100%;
    }
}
`,h={root:function(t){var a=t.instance,n=t.props;return["p-inputtextarea p-inputtext p-component",{"p-filled":a.filled,"p-inputtextarea-resizable ":n.autoResize}]}},m=r.extend({name:"textarea",css:d,classes:h}),c={name:"BaseTextarea",extends:p,props:{modelValue:null,autoResize:Boolean},style:m,provide:function(){return{$parentInstance:this}}},f={name:"Textarea",extends:c,emits:["update:modelValue"],mounted:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},updated:function(){this.$el.offsetParent&&this.autoResize&&this.resize()},methods:{resize:function(){this.$el.style.height="auto",this.$el.style.height=this.$el.scrollHeight+"px",parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden"},onInput:function(t){this.autoResize&&this.resize(),this.$emit("update:modelValue",t.target.value)}},computed:{filled:function(){return this.modelValue!=null&&this.modelValue.toString().length>0},ptmParams:function(){return{context:{disabled:this.$attrs.disabled||this.$attrs.disabled===""}}}}},v=["value"];function x(e,t,a,n,$,s){return l(),o("textarea",u({class:e.cx("root"),value:e.modelValue,onInput:t[0]||(t[0]=function(){return s.onInput&&s.onInput.apply(s,arguments)})},e.ptm("root",s.ptmParams),{"data-pc-name":"textarea"}),null,16,v)}f.render=x;export{z as O,f as s};
