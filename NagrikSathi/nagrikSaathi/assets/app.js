(function(){var d=document,R=d.documentElement,S={getItem:function(){},setItem:function(){}};try{S=localStorage}catch(e){}
function L(){return R.dataset.lang||'hi'}function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function setL(l){R.dataset.lang=l;R.lang=l;try{S.setItem('l',l)}catch(e){}d.querySelectorAll('[data-l]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l==l)})}
setL(S.getItem('l')||'hi');d.querySelectorAll('[data-l]').forEach(function(b){b.onclick=function(){setL(b.dataset.l)}});
var sn=d.getElementById('sn');function sen(on){d.body.classList.toggle('senior',on);if(sn)sn.setAttribute('aria-pressed',on);try{S.setItem('s',on?'1':'')}catch(e){}}sen(!!S.getItem('s'));if(sn)sn.onclick=function(){sen(!d.body.classList.contains('senior'))};
var bk=d.getElementById('bk');if(bk)bk.onclick=function(){history.length>1?history.back():location.href='/'};
d.querySelectorAll('.listen').forEach(function(b){b.onclick=function(){var m=d.getElementById('lm');if(!window.speechSynthesis){if(m)m.textContent=L()=='hi'?'इस ब्राउज़र में ऑडियो उपलब्ध नहीं है।':'Audio is not available in this browser.';return}
if(speechSynthesis.speaking){speechSynthesis.cancel();return}var t=[].map.call(d.querySelectorAll('main [lang="'+L()+'"]'),function(e){return e.innerText}).join('. ');var u=new SpeechSynthesisUtterance(t);u.lang=L()=='hi'?'hi-IN':'en-IN';speechSynthesis.speak(u)}});
var TY={schemes:['योजना','Scheme'],documents:['दस्तावेज़','Document'],scams:['स्कैम से सुरक्षा','Scam safety'],pages:['जानकारी पेज','Info page']},SV={verified:['🟢','आधिकारिक स्रोत से सत्यापित','Verified from official source'],pending:['🟡','सत्यापन बाकी','Verification pending'],unverified:['🔴','सत्यापन आवश्यक','Verification Required']},RK={verified:0,pending:1,unverified:2};
var IDX=null;function load(cb){if(IDX)return cb();fetch('/search-index.json').then(function(r){return r.json()}).then(function(a){IDX=a;cb()}).catch(function(){IDX=[];cb()})}
function norm(s){return String(s).toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s]/gu,' ')}
function row(x){var v=SV[x.status]||SV.unverified,t=TY[x.type]||TY.pages;return '<div class="res"><a href="'+x.url+'"><b><span lang="hi">'+esc(x.hi)+'</span><span lang="en">'+esc(x.en)+'</span></b></a><br><small>'+'<span lang="hi">'+t[0]+'</span><span lang="en">'+t[1]+'</span> · <span lang="hi">'+(/State/.test(x.scope)?'राज्य के अनुसार':'केंद्र / पूरे भारत')+'</span><span lang="en">'+(/State/.test(x.scope)?'Varies by state':'Central / All India')+'</span> · '+(x.status==='verified'?'<span class="badge s-verified">'+v[0]+' <span lang="hi">'+v[1]+'</span><span lang="en">'+v[2]+'</span></span>':'')+(x.last_verified?' · '+esc(x.last_verified):'')+'</small></div>'}
function show(el,a,none){el.innerHTML=a.length?a.map(row).join(''):none}
var q=d.getElementById('q'),res=d.getElementById('res');
if(res&&q){var p=new URLSearchParams(location.search).get('q')||'';q.value=p;load(function(){var w=norm(p).split(/\s+/).filter(function(x){return x.length>1});if(!w.length){res.innerHTML='';return}
var a=IDX.map(function(x){var k=norm(x.hi+' '+x.en+' '+(x.kw||'')),s=0;w.forEach(function(z){if(k.indexOf(z)>-1)s++});return{x:x,s:s}}).filter(function(o){return o.s>0}).sort(function(a,b){return b.s-a.s||RK[a.x.status]-RK[b.x.status]}).map(function(o){return o.x});
show(res,a,'<p lang="hi">सत्यापित जानकारी अभी उपलब्ध नहीं है। आधिकारिक खोज के लिए india.gov.in देखें।</p><p lang="en">Verified information is not currently available. See india.gov.in for official search.</p>')})}
var m=d.getElementById('mic'),SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(m&&SR&&q){m.hidden=false;m.onclick=function(){var r=new SR();r.lang=L()=='hi'?'hi-IN':'en-IN';r.onresult=function(e){q.value=e.results[0][0].transcript;q.form.submit()};r.start()}}
var ff=d.getElementById('ff');if(ff)ff.onsubmit=function(e){e.preventDefault();var c=ff.cat.value,age=ff.age.value,st=ff.st.value;load(function(){var a=IDX.filter(function(x){var t=x.tags||[];if(x.state&&x.state!==st)return false;return t.indexOf(c)>-1||(age=='60+'&&t.indexOf('senior')>-1)});show(d.getElementById('fr'),a,'<p lang="hi">इस चयन के लिए सत्यापित योजना जानकारी अभी उपलब्ध नहीं है। myScheme (आधिकारिक) पर खोजें।</p><p lang="en">Verified scheme information for this selection is not currently available. Search on myScheme (official).</p>');d.getElementById('fn').hidden=false})};
var CQ=[['🏦','बैंक की समस्या','Banking problem','पहले अपने बैंक की शिकायत प्रक्रिया अपनाएँ। हल न हो तो बैंकिंग नियामक की आधिकारिक शिकायत व्यवस्था देखें।',"First use your bank's grievance process. If unresolved, see the banking regulator's official complaint route.",''],['💻','साइबर फ्रॉड','Cyber fraud','साइबर क्राइम की आधिकारिक रिपोर्टिंग व्यवस्था पर जाएँ।','Go to the official cybercrime reporting route.','/cyber-safety/'],['🛒','उपभोक्ता विवाद','Consumer dispute','पहले संबंधित कंपनी, फिर आधिकारिक उपभोक्ता शिकायत तंत्र।','The company first, then the official consumer grievance mechanism.',''],['🏛️','सरकारी सेवा में समस्या','Government service issue','संबंधित विभाग की शिकायत व्यवस्था या आधिकारिक सरकारी शिकायत पोर्टल।','The concerned department\'s grievance route or the official government grievance portal.',''],['🚑','आपातकाल','Emergency','तुरंत स्थानीय आपातकालीन सेवाओं से संपर्क करें। नंबर आधिकारिक स्रोत से जाँचें।','Contact local emergency services immediately. Confirm numbers from an official source.','/helplines/']],ct=d.getElementById('ct');
if(ct){ct.innerHTML=CQ.map(function(x,i){return '<button type="button" data-i="'+i+'">'+x[0]+' <span lang="hi">'+x[1]+'</span><span lang="en">'+x[2]+'</span></button>'}).join(' ');ct.onclick=function(e){var b=e.target.closest('button');if(!b)return;var x=CQ[b.dataset.i];d.getElementById('ca').innerHTML='<p class="note"><span lang="hi">'+x[3]+'</span><span lang="en">'+x[4]+'</span>'+(x[5]?' <a href="'+x[5]+'">→</a>':'')+'</p>'}}
var cp=d.getElementById('cp');if(cp)cp.onclick=function(){var t='Nagrik Saathi report: '+d.getElementById('rt').value+' — '+d.getElementById('rx').value;try{navigator.clipboard.writeText(t);d.getElementById('cm').textContent=L()=='hi'?'कॉपी हो गया।':'Copied.'}catch(e){}};

/* Chat assistant: search only published, source-backed site records. */
var chatToggle=d.getElementById('chat-toggle'), chatPanel=d.getElementById('chat-panel'),
    chatClose=d.getElementById('chat-close'), chatMessages=d.getElementById('chat-messages'),
    chatForm=d.getElementById('chat-form'), chatInput=d.getElementById('chat-q'), chatGreeted=false;
function chatAdd(text,kind,html){
  var el=d.createElement('div');el.className='chat-msg '+kind;
  if(html)el.innerHTML=html;else el.textContent=text;
  chatMessages.appendChild(el);chatMessages.scrollTop=chatMessages.scrollHeight;
}
function chatOpen(){
  chatPanel.hidden=false;chatToggle.setAttribute('aria-expanded','true');
  if(!chatGreeted){chatGreeted=true;chatAdd(L()==='hi'?'नमस्ते! मैं नागरिक साथी सहायक हूँ। योजनाओं, दस्तावेज़ों, पेंशन, छात्रवृत्ति या हेल्पलाइन के बारे में पूछें।':'Hello! I am the Nagrik Saathi assistant. Ask about schemes, documents, pensions, scholarships or helplines.','bot');}
  chatInput.focus();
}
function chatShut(){chatPanel.hidden=true;chatToggle.setAttribute('aria-expanded','false');}
if(chatToggle&&chatPanel&&chatMessages&&chatForm&&chatInput){
  chatToggle.onclick=function(){chatPanel.hidden?chatOpen():chatShut();};
  if(chatClose)chatClose.onclick=chatShut;
  function chatWords(q){
    var aliases={'छात्रवृत्ति':'scholarship','स्कॉलरशिप':'scholarship','छात्र':'student','पेंशन':'pension','वृद्ध':'senior','बुजुर्ग':'senior','दस्तावेज':'document','प्रमाणपत्र':'certificate','जन्म':'birth','जाति':'caste','आय':'income','निवास':'domicile','ठगी':'fraud','धोखाधड़ी':'fraud','फ्रॉड':'fraud','साइबर':'cyber','हेल्पलाइन':'helpline','किसान':'farmer','कृषि':'farmer','महिला':'women','बेटी':'girl','रोजगार':'employment','नौकरी':'job'};
    var raw=norm(q).split(/\s+/).filter(function(x){return x.length>1;});
    return raw.map(function(x){return aliases[x]||x;});
  }
  function chatSearch(q){
    var words=chatWords(q), raw=norm(q);
    if(!words.length)return {message:L()==='hi'?'कृपया अपना सवाल लिखें। उदाहरण: छात्रवृत्ति, पेंशन, जन्म प्रमाणपत्र या साइबर फ्रॉड।':'Please type a question. Examples: scholarship, pension, birth certificate or cyber fraud.'};
    if(/(1930|cyber|fraud|scam|ठगी|धोखाधड़ी|फ्रॉड)/.test(raw)){
      var urgent=L()==='hi'?'अगर पैसे की साइबर ठगी हुई है, तो तुरंत अपने बैंक/पेमेंट ऐप से संपर्क करें और 1930 पर कॉल करें। आधिकारिक रिपोर्टिंग पोर्टल भी उपलब्ध है:':'If money was lost in a cyber fraud, contact your bank/payment app immediately and call 1930. You can also report at the official portal:';
      var fraudLink='<a href="/cyber-safety/">'+(L()==='hi'?'साइबर सुरक्षा और आगे के कदम':'Cyber safety and next steps')+'</a> · <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>';
      return {message:urgent,html:fraudLink};
    }
    if(!IDX||!IDX.length)return {message:L()==='hi'?'खोज डेटा लोड नहीं हो पाया। पेज refresh करके फिर कोशिश करें।':'Search data could not be loaded. Refresh the page and try again.'};
    var ranked=IDX.map(function(x){
      var hay=norm([x.hi,x.en,x.kw,x.scope,(x.tags||[]).join(' '),x.number||''].join(' ')), score=0;
      words.forEach(function(w){if(hay.indexOf(w)>-1)score+=w.length>4?3:1;});
      if(/scholar|student|education/.test(raw)&&/scholar|student|education|छात्र/.test(hay))score+=4;
      if(/pension|senior/.test(raw)&&/pension|senior|वृद्ध/.test(hay))score+=4;
      if(/document|certificate|birth|caste|domicile/.test(raw)&&x.type==='documents')score+=3;
      if(/farmer|kisan|किसान/.test(raw)&&/farmer|किसान|कृषि/.test(hay))score+=4;
      if(/women|girl|महिला|बेटी/.test(raw)&&/women|girl|महिला|बेटी/.test(hay))score+=3;
      return {x:x,score:score};
    }).filter(function(o){return o.score>0;}).sort(function(a,b){return b.score-a.score;});
    var unique=[],seen={};
    ranked.forEach(function(o){if(!seen[o.x.url]&&unique.length<4){seen[o.x.url]=1;unique.push(o.x);}});
    if(!unique.length)return {message:L()==='hi'?'इस सवाल से जुड़ा सटीक रिकॉर्ड नहीं मिला। अलग शब्दों से खोजें या वेबसाइट की खोज सुविधा इस्तेमाल करें।':'I could not find a matching record. Try different keywords or use the website search.'};
    var links=unique.map(function(x){return '<a href="'+esc(x.url)+'">'+esc(L()==='hi'?x.hi:x.en)+'</a><small class="chat-result-meta">'+esc(x.type==='schemes'?(L()==='hi'?'योजना':'Scheme'):x.type==='documents'?(L()==='hi'?'दस्तावेज़':'Document'):x.type==='scams'?(L()==='hi'?'सुरक्षा जानकारी':'Safety guide'):(L()==='hi'?'हेल्पलाइन / जानकारी':'Helpline / information'))+'</small>';}).join('');
    return {message:L()==='hi'?'आपके सवाल से जुड़े ये रिकॉर्ड मिले:':'Here are the records related to your question:',html:'<div class="chat-results">'+links+'</div>'};
  }
  function chatAsk(q){
    chatAdd(q,'user');
    var wait=d.createElement('div');wait.className='chat-msg bot chat-typing';wait.textContent=L()==='hi'?'साइट की जानकारी खोज रहा हूँ…':'Searching site information…';chatMessages.appendChild(wait);chatMessages.scrollTop=chatMessages.scrollHeight;
    load(function(){wait.remove();var result=chatSearch(q);chatAdd(result.message,'bot');if(result.html)chatAdd('', 'bot',result.html);});
  }
  chatForm.onsubmit=function(e){e.preventDefault();var q=chatInput.value.trim();if(!q)return;chatInput.value='';chatAsk(q);};
  d.querySelectorAll('[data-chat]').forEach(function(b){b.onclick=function(){
    if(chatPanel.hidden)chatOpen();
    var qs={scholarship:L()==='hi'?'छात्रवृत्ति student scholarship':'student scholarship',pension:L()==='hi'?'बुजुर्गों के लिए पेंशन':'senior citizen pension',document:L()==='hi'?'जन्म प्रमाणपत्र':'birth certificate',fraud:L()==='hi'?'साइबर फ्रॉड 1930':'cyber fraud 1930'};
    chatAsk(qs[b.dataset.chat]||'सरकारी योजना');
  };});
}

})();
