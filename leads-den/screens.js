const dialog=document.querySelector('#screen-dialog');
const enlarged=dialog.querySelector('img');
document.querySelectorAll('.screen-zoom').forEach(button=>button.addEventListener('click',()=>{
  const image=button.querySelector('img');
  enlarged.src=image.src;
  enlarged.alt=image.alt;
  dialog.showModal();
}));
dialog.querySelector('.close-screen').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
