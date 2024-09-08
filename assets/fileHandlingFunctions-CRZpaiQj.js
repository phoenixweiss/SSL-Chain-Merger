function a(o,n,c){const l=new Blob([o],{type:"text/plain"}),t=URL.createObjectURL(l),e=document.createElement("a");e.href=t,e.download=`${n}.${c}`,e.click(),URL.revokeObjectURL(t)}export{a as d};
