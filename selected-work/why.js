// 每个作品的「为什么做」：问题 → 假设 → 方案 → 验证 / 结果。
// 作品列表和各案例页共用这一份三语文案；页面切换语言时（<html lang> 变化）自动重新渲染。
(function(){
  var LABELS={
    zh:{title:'为什么做',kicker:'WHY',problem:'问题',hypothesis:'假设',solution:'方案',result:'验证 / 结果'},
    ja:{title:'なぜ作ったか',kicker:'WHY',problem:'課題',hypothesis:'仮説',solution:'解決策',result:'検証・結果'},
    en:{title:'Why I made it',kicker:'WHY',problem:'Problem',hypothesis:'Hypothesis',solution:'Solution',result:'Validation / Result'}
  };
  var WHY={
    capture:{
      zh:{problem:'和 AI 聊完，总有几句想留下。单独复制会丢掉前后文；专门存进笔记又会打断思路，过几天就找不回来了。',
          hypothesis:'如果保存只需要一个快捷键，而且自动带上当时的问题、来源和时间，人就会在当下把有用的内容留住，整理可以以后再做。',
          solution:'做成一个 macOS 工具：选中、按快捷键，内容连同上下文先进 Workbench；之后按 Box 分类，需要时再让 AI 整理、合并导出。',
          result:'已经是能用的软件。我自己在 AI 对话、查资料和 AI Coding 中高频使用；朋友反馈，快速保存和多条导出确实减少了整理时间。'},
      ja:{problem:'AIとの会話には残したい数行がある。けれど一部だけコピーすると前後の文脈が消え、ノートに移す作業は思考を中断させ、数日後には見つからなくなる。',
          hypothesis:'ショートカット一つで、質問・出典・時刻まで自動で一緒に保存できれば、人はその場で大切な情報を残せる。整理はあとからでいい。',
          solution:'macOSツールとして実装。選択してショートカットを押すと文脈ごとWorkbenchへ。あとからBoxで分類し、必要なときだけAIで整理・統合・書き出し。',
          result:'実際に使えるソフトウェアとして完成。AIとの対話、調べもの、AIコーディングで自分が日常的に使用中。友人からは「すばやい保存と複数件の書き出しで整理の時間が減った」という声。'},
      en:{problem:'After an AI conversation there are always a few lines worth keeping. Copying them alone loses the context; moving them into notes breaks your train of thought, and days later they are gone.',
          hypothesis:'If saving took one shortcut and automatically kept the question, source and time, people would keep what matters in the moment and organize it later.',
          solution:'A macOS tool: select, press a shortcut, and the passage lands in the Workbench with its context. Sort it into Boxes later, and call on AI only when needed to organize, merge and export.',
          result:'Working software. I use it heavily in AI chats, research and AI coding; a friend who uses it says quick saving and multi-item export cut down their organizing time.'}
    },
    guild:{
      zh:{problem:'待办清单只有打勾，用久了很单调。我在 SHARE 的研究里看到，下载效率 App 后能用满一个月的人只有 10.7%。',
          hypothesis:'如果完成任务能让另一个世界里的角色和小屋一起成长，一天做过的事还能变成可以回看的故事，人会更愿意一直用下去。',
          solution:'放置型首页 + 任务的奇幻转译 + 经验值、积分和小屋装扮；完成三项任务解锁当天的冒险日记，并保留 True Record 真实记录。',
          result:'可操作的高保真原型，已迭代 21 版；还没有做正式用户测试。下一步观察三点：不看说明能否完成任务、会选 Adventure 还是 True Record、一周后还愿不愿意打开。'},
      ja:{problem:'タスク管理はチェックを付けるだけで、続けるほど単調になる。SHAREの調査では、効率化アプリを1か月以上使い続けた人は10.7%だった。',
          hypothesis:'タスクを終えるたびに、もう一つの世界のキャラクターと小屋が成長し、一日が読み返せる物語になれば、人は使い続けたくなるのではないか。',
          solution:'放置型のホーム、タスクのファンタジー変換、EXP・ポイント・小屋の装飾。3つ完了するとその日の冒険日記が解放され、True Recordで実際の記録も残る。',
          result:'操作できる高精細プロトタイプ（21回のイテレーション）。正式なユーザーテストは未実施。次は、説明なしで完了できるか、AdventureとTrue Recordのどちらを選ぶか、1週間後も開きたいかを検証する。'},
      en:{problem:'To-do lists are just checkboxes, and they get monotonous. In my SHARE research, only 10.7% of people kept using a productivity app for more than a month.',
          hypothesis:'If finishing a task also grew a character and a hut in another world, and each day became a story worth rereading, people might keep coming back.',
          solution:'An idle-style home, fantasy rewrites of real tasks, EXP, points and hut décor. Three completed tasks unlock the day’s adventure journal, with a True Record kept alongside.',
          result:'An operable high-fidelity prototype, iterated 21 times; no formal user testing yet. Next: can people finish tasks without instructions, do they pick Adventure or True Record, and do they still open it after a week?'}
    },
    orbit:{
      zh:{problem:'学英语、盯机票、看行业新闻，这些每天都要做的事，在 AI 聊天里每次都得重新交代；任务一多就乱，也看不到 AI 做到哪一步了。',
          hypothesis:'如果“说一次”就能变成按计划自动运行的任务，所有任务的状态和结果都集中在一个首页，人就敢把重复的事交给 AI，同时保持掌控。',
          solution:'手机端 Agent 管理原型：一句话生成定期任务，开始前确认权限；首页看全部状态和结果；修改前先预览变化，不好用可以退回上一版。',
          result:'访谈了一位九州大学博士生。他提到的三个痛点——问过的东西找不回、重复的事要自己启动、难以确认出处——对应成了持续运行、定期汇总、信息溯源三个功能。目前是可点击的高保真原型。'},
      ja:{problem:'英語学習、航空券のチェック、業界ニュース。毎日のことなのに、AIチャットでは毎回説明し直す必要がある。タスクが増えると混乱し、AIがどこまで進んだかも見えない。',
          hypothesis:'一度伝えるだけで計画どおりに動くタスクになり、すべての状態と結果がひとつのホームで見えれば、人は繰り返しの作業をAIに任せつつ、主導権も保てる。',
          solution:'モバイルのAgent管理プロトタイプ。一言で定期タスクを作成し、開始前に権限を確認。ホームで全体の状態と結果を把握し、変更前には差分を確認、うまくいかなければ前の版に戻せる。',
          result:'九州大学の博士課程の学生にインタビュー。「聞いたことが見つからない」「繰り返しの作業を自分で起動する」「出典を確かめにくい」という3つの悩みを、継続実行・定期サマリー・情報の出典表示という機能に落とし込んだ。現在はクリックできる高精細プロトタイプ。'},
      en:{problem:'Learning English, watching flight prices, following industry news: daily tasks that AI chat makes you re-explain every time. With more tasks it gets messy, and you can’t see how far the AI has got.',
          hypothesis:'If saying it once turned into a task that runs on schedule, with every task’s status and results on one home screen, people could hand repetitive work to AI and still stay in control.',
          solution:'A mobile agent manager: create a recurring task in one sentence and confirm permissions before it starts; see every status and result on Home; preview changes before editing, and roll back if a new rule works worse.',
          result:'I interviewed a PhD student at Kyushu University. His three pain points—past answers are hard to find, repeat tasks must be restarted by hand, sources are hard to verify—became continuous runs, scheduled summaries and source tracing. Currently a clickable high-fidelity prototype.'}
    },
    nsf:{
      zh:{problem:'我想做一个联机恐怖游戏，让玩家害怕的不是陌生的地方，而是自己白天刚熟悉过的空间和同事。',
          hypothesis:'白天越熟悉，夜里被错误重组时就越不安；如果白天的行为会决定夜里的地图和 Host 的能力，玩家也会认真对待白天。',
          solution:'4 人联机：白天在公司上班、探索；黄昏揭晓 1 名 Host 和 3 名 Intruders；夜里楼层按白天的共同经历重构，Intruders 集齐 5 件物资后逃脱。',
          result:'概念开发中：玩法系统、对局流程、分镜和视觉方向已经完成（视觉由 AI 辅助）；还没有可以试玩的版本，接下来会继续开发。'},
      ja:{problem:'怖いのは見知らぬ場所ではなく、昼に見慣れたばかりの空間と同僚。そんなオンライン協力ホラーを作りたかった。',
          hypothesis:'昼に慣れ親しむほど、夜に誤って組み替えられたときの不安は大きくなる。昼の行動が夜のマップとHostの能力を決めれば、プレイヤーは昼も真剣に過ごす。',
          solution:'4人オンライン。昼は会社で働き探索し、黄昏に1人のHostと3人のIntrudersが決まる。夜は昼の共通体験をもとにフロアが再構成され、Intrudersは物資を5つ集めて脱出する。',
          result:'コンセプト開発中。ゲームシステム、対局の流れ、絵コンテ、ビジュアル方向は完成（ビジュアルはAI補助）。遊べるバージョンはまだなく、今後も開発を続ける。'},
      en:{problem:'I wanted an online co-op horror game where the fear comes not from strange places, but from the space and coworkers you got to know that same afternoon.',
          hypothesis:'The more familiar the day feels, the more unsettling its wrong reconstruction at night. If daytime actions shape the night map and the Host’s powers, players will take the day seriously too.',
          solution:'Four players online: work and explore the office by day; at dusk one Host and three Intruders are revealed; at night the floor is rebuilt from the day’s shared events, and Intruders escape once they gather five supplies.',
          result:'In concept development: gameplay systems, match flow, storyboard and visual direction are done (AI-assisted visuals). There is no playable build yet; development continues.'}
    },
    share:{
      zh:{problem:'很多人下载了效率 App，没多久就不用了。早期问卷里，能用满一个月的人只有 10.7%，“下载后几乎不用”的占 31.4%。',
          hypothesis:'放弃的主要原因不是功能不够，而是一个人很难坚持；如果有人一起、有人看得见进度，人就更容易坚持下去。',
          solution:'个人的任务、专注计时和日历之外，加入按目标组队、在线自习室、进度分享和团队挑战。',
          result:'通过问卷、访谈和案例分析整理出三个放弃原因，并完成高保真界面。没有做后续验证，问卷也没有记录样本量，数据只能作为早期参考。'},
      ja:{problem:'効率化アプリをダウンロードしても、多くの人はすぐに使わなくなる。初期のアンケートでは、1か月以上使い続けた人は10.7%、「ダウンロード後ほぼ使っていない」は31.4%だった。',
          hypothesis:'やめてしまう主な理由は機能不足ではなく、一人では続けにくいこと。一緒に取り組む人がいて、進捗が見えれば、続けやすくなる。',
          solution:'個人のタスク、集中タイマー、カレンダーに加えて、目標別のチーム、オンライン自習室、進捗共有、チームチャレンジを設計。',
          result:'アンケート、インタビュー、事例分析からやめる理由を3つに整理し、高精細UIまで制作。事後検証は行っておらず、サンプル数も記録していないため、数値は初期の参考値。'},
      en:{problem:'Many people download a productivity app and quickly stop using it. In an early survey only 10.7% kept using one for over a month, while 31.4% barely used it after downloading.',
          hypothesis:'People quit less because features are missing and more because it is hard to keep going alone. With others alongside, and progress others can see, sticking with it gets easier.',
          solution:'Alongside personal tasks, a focus timer and a calendar: goal-based teams, online study rooms, progress sharing and team challenges.',
          result:'Surveys, interviews and case analysis surfaced three reasons people quit, carried through to a high-fidelity interface. There was no follow-up validation and sample sizes were not recorded, so the numbers are early signals only.'}
    },
    didi:{
      zh:{problem:'为滴滴代驾做一则父亲节漫画广告，要让读者记住“代驾”这项服务。',
          hypothesis:'先用孩子眼中的“超级英雄老爸”做铺垫，最后反转成深夜把喝了酒的人安全送回家的代驾司机，情感上的落差会让人记住它。',
          solution:'参与故事提案和分镜；漫画从设计到上色由我一个人完成。',
          result:'发布后阅读超过 10 万次。'},
      ja:{problem:'DiDi代行の父の日向け漫画広告で、「運転代行」というサービスを読者の記憶に残すこと。',
          hypothesis:'子どもの目に映る「スーパーヒーローの父」を描いたうえで、最後に深夜に飲酒した人を安全に送り届ける代行ドライバーだと明かせば、その感情の落差が記憶に残る。',
          solution:'ストーリー提案と絵コンテに参加し、漫画はデザインから着彩まで一人で制作。',
          result:'公開後、10万回以上閲覧された。'},
      en:{problem:'A Father’s Day comic ad for DiDi’s designated-driver service that would make readers remember the service itself.',
          hypothesis:'Set up the father as a superhero in his child’s eyes, then reveal he is a late-night driver taking people home safely after drinking; the emotional turn would make it stick.',
          solution:'Contributed to the story proposal and storyboard; created the comic myself from design through coloring.',
          result:'Over 100,000 views after release.'}
    },
    burberry:{
      zh:{problem:'为 Burberry 七夕活动做一组微信推送漫画。',
          hypothesis:'让一个第一次来到地球的外星人去学着理解人类的感情，用旁观者的眼光讲七夕，会比直接讲爱情更新鲜，也更容易让人读下去。',
          solution:'参与故事提案；画面构成和插画全部由我完成。',
          result:'作为 Burberry 七夕活动的微信推送漫画使用。'},
      ja:{problem:'BurberryのWeChat向け七夕プロモーション漫画を制作すること。',
          hypothesis:'地球に初めて来た宇宙人が人間の感情を学んでいく――外側からの視点で七夕を描けば、恋愛を正面から語るより新鮮で、最後まで読んでもらえる。',
          solution:'ストーリー提案に参加し、画面構成とイラストはすべて一人で制作。',
          result:'BurberryのWeChat七夕プロモーション漫画として使用。'},
      en:{problem:'A WeChat comic series for Burberry’s Qixi (Chinese Valentine’s Day) campaign.',
          hypothesis:'An alien learning human feelings for the first time tells the Qixi story from the outside, which could feel fresher than a straight love story and keep people reading.',
          solution:'Contributed to the story proposal; created all compositions and illustrations myself.',
          result:'Used as Burberry’s Qixi WeChat campaign comic.'}
    }
  };
  var KEYS=['problem','hypothesis','solution','result'];

  var css=document.createElement('style');
  css.textContent=
    '.why-list{margin:0;padding:0;border-top:1px solid var(--why-line,rgba(255,255,255,.14))}'+
    '.why-row{display:grid;grid-template-columns:minmax(5.5em,auto) 1fr;gap:14px;padding:11px 0;border-bottom:1px solid var(--why-line,rgba(255,255,255,.08))}'+
    '.why-row dt{margin:0;padding-top:2px;font:600 10px/1.5 system-ui,sans-serif;letter-spacing:.08em;color:var(--why-accent,#8fb6d6);white-space:nowrap}'+
    '.why-row dt i{font-style:normal;opacity:.55;margin-right:6px}'+
    '.why-row dd{margin:0;font:13px/1.75 system-ui,"Noto Sans SC","Hiragino Sans",sans-serif;color:var(--why-text,inherit);opacity:.86}'+
    '.why-compact{margin:22px 0 4px}'+
    '.why-compact .why-head{display:block;margin:0 0 8px;font:10px system-ui,sans-serif;letter-spacing:.2em;color:var(--why-accent,#8fb6d6)}'+
    '.why-compact .why-row{padding:8px 0;gap:10px}.why-compact .why-row dd{font-size:12.5px;line-height:1.7}'+
    '@media(max-width:520px){.why-row{grid-template-columns:1fr;gap:3px}}';
  document.head.appendChild(css);

  function lang(){var l=(document.documentElement.lang||'ja').slice(0,2);return LABELS[l]?l:'ja'}
  function list(copy,L){
    return '<dl class="why-list">'+KEYS.map(function(k,i){return '<div class="why-row"><dt><i>0'+(i+1)+'</i>'+L[k]+'</dt><dd>'+copy[k]+'</dd></div>'}).join('')+'</dl>';
  }
  // 浅色背景的页面（如 Capture）换成深色分隔线和标签色
  function onLight(el){
    for(var n=el;n&&n.nodeType===1;n=n.parentElement){
      var m=getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      if(m&&(m.length<4||+m[3]>0.5))return (0.299*m[0]+0.587*m[1]+0.114*m[2])>150;
    }
    return false;
  }
  function render(){
    var l=lang(),L=LABELS[l];
    document.querySelectorAll('[data-why]').forEach(function(el){
      var data=WHY[el.dataset.why];if(!data)return;
      if(onLight(el)){el.style.setProperty('--why-line','rgba(20,24,30,.14)');el.style.setProperty('--why-accent','#3f6f95');}
      var copy=data[l],mode=el.dataset.whyMode||'compact';
      if(mode==='section')      // Capture / Orbit / NSF / SHARE case pages
        el.innerHTML='<div class="section-head"><span class="section-no">'+L.kicker+'</span><div><h2>'+L.title+'</h2></div></div>'+list(copy,L);
      else if(mode==='guild')   // Guild Log case page
        el.innerHTML='<span class="num">'+L.kicker+'</span><h2>'+L.title+'</h2>'+list(copy,L);
      else{el.classList.add('why-compact');el.innerHTML='<span class="why-head">'+L.kicker+' · '+L.title+'</span>'+list(copy,L);}
    });
  }
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
