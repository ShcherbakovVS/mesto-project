(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{_4:()=>P});var t={baseUrl:"https://nomoreparties.co/v1/plus-cohort-24",headers:{authorization:"dc42361d-7522-43c4-a3be-561c52a9ed06","Content-Type":"application/json"}},n=document.querySelector(".popup_type_edit"),o=document.querySelector(".popup_type_add"),r=document.querySelector(".popup_type_image"),c=document.querySelector(".popup_type_delete"),a=document.querySelector(".popup_type_avatar-exchange"),s=document.querySelector(".popup__save_margin_less"),u=n.querySelector(".popup__container"),i=o.querySelector(".popup__container"),l=a.querySelector(".popup__container"),p=l.querySelector("#avatarUrl"),d=i.querySelector("#placeName"),_=i.querySelector("#placeImg"),v=u.querySelector("#name"),m=u.querySelector("#description"),f=r.querySelector(".popup__title-place"),y=Array.from(document.querySelectorAll(".popup")),h=Array.from(document.querySelectorAll(".popup__close")),S=function(e){"Escape"===e.key&&C(document.querySelector(".popup_opened"))};function q(e){e.classList.add("popup_opened"),document.addEventListener("keydown",S)}function C(e){document.removeEventListener("keydown",S),e.classList.remove("popup_opened")}var g,k,E=document.querySelector("#template-card").content,L=r.querySelector(".popup__image"),b=document.querySelector(".elements");function x(e,n,o,a,s){var u=E.querySelector(".elements__element").cloneNode(!0),i=u.querySelector(".elements__image"),l=u.querySelector(".elements__title"),p=u.querySelector(".elements__like-quantity"),d=u.querySelector(".elements__trash");return a!==P&&d.remove(),i.src=e,i.alt=n,l.textContent=n,p.textContent=o,u.querySelector(".elements__like").addEventListener("click",(function(e){e.target.classList.contains("elements__like_actived")?function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(s).then((function(t){console.log(t),t.likes.some((function(e){return e._id===P}))||e.target.classList.remove("elements__like_actived"),p.textContent=t.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(s).then((function(t){t.likes.some((function(e){return e._id===P}))&&e.target.classList.add("elements__like_actived"),p.textContent=t.likes.length})).catch((function(e){console.log(e)}))})),d.addEventListener("click",(function(){q(c),g=s,k=u})),i.addEventListener("click",(function(){q(r),L.src=i.src,L.alt=l.textContent,f.textContent=l.textContent})),u}function j(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.classList.add(n.activeButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.classList.remove(n.activeButtonClass),t.setAttribute("disabled",!0))}function A(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".popup__".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".popup__".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}var P,B,U=document.querySelector(".profile__avatar-change"),T=document.querySelector(".profile__edit"),O=document.querySelector(".profile__add"),w=document.querySelector(".profile__name"),D=document.querySelector(".profile__description"),N=document.querySelector(".profile__avatar");fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){N.src=e.avatar,w.textContent=e.name,D.textContent=e.about,P=e._id,fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){b.append(x(e.link,e.name,e.likes.length,e.owner._id,e._id))}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)})),T.addEventListener("click",(function(){v.value=w.textContent,m.value=D.textContent;var e=Array.from(u.querySelectorAll(".popup__input-text"));j(e,u.querySelector(".popup__save"),{inactiveButtonClass:"popup__save_type_inactive",activeButtonClass:"popup__save_type_active"}),e.forEach((function(e){A(u,e,{inputErrorClass:"popup__input-text_type_error",errorClass:"popup__input-error_active"})})),q(n)})),h.forEach((function(e){e.addEventListener("click",(function(){C(document.querySelector(".popup_opened"))}))})),u.addEventListener("submit",(function(e){var o,r,c=e.target.querySelector(".popup__save");c.textContent="Сохранение...",e.preventDefault(),(o=v.value,r=m.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:o,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){w.textContent=e.name,D.textContent=e.about,C(n),c.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),O.addEventListener("click",(function(){q(o)})),i.addEventListener("submit",(function(e){var n,r,c=e.target.querySelector(".popup__save");c.textContent="Сохранение...",e.preventDefault(),(n=d.value,r=_.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){b.prepend(x(e.link,e.name,0,P,e._id)),i.reset(),C(o),j(Array.from(i.querySelectorAll(".popup__input-text")),i.querySelector(".popup__save"),{inactiveButtonClass:"popup__save_type_inactive",activeButtonClass:"popup__save_type_active"}),c.textContent="Создать"})).catch((function(e){console.log(e)}))})),y.forEach((function(e){e.addEventListener("click",(function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__window-image"))&&C(e.currentTarget)}))})),B={formSelector:".popup__container",inputSelector:".popup__input-text",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_type_inactive",activeButtonClass:"popup__save_type_active",inputErrorClass:"popup__input-text_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(B.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);j(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){A(e,r,t),j(n,o,t)}))}))}(e,B)})),s.addEventListener("click",(function(){var e;(e=g,fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){k.remove(),C(c)})).catch((function(e){console.log(e)}))})),U.addEventListener("click",(function(){q(a)})),l.addEventListener("submit",(function(e){var n,o=e.target.querySelector(".popup__save");o.textContent="Сохранение...",e.preventDefault(),(n=p.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){N.src=e.avatar,C(a),l.reset(),o.textContent="Сохранить"})).catch((function(e){console.log(e)}))}))})();