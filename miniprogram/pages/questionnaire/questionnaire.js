const app = getApp();

Page({
  data: {
    questions: [{question: '没有兴趣或不乐意做事情'}, 
                {question: '感到情绪低落，沮丧或绝望'}, 
                {question: '入睡或保持睡眠有困难'}, 
                {question: '感到疲劳或没有精神'}, 
                {question: '胃口不好或饮食过度'}, 
                {question: '对自己感到难过'}],
    options: [{option: '很少或没有 不到1天', value:'很少或没有 不到1天', check:'true'},
              {option: '一些或一点 1-2天', value:'一些或一点 1-2天', check:'true'},
              {option: '偶尔或适量 3-4天', value:'偶尔或适量 3-4天', check:'true'},
              {option: '大部分或所有 5-7天', value:'大部分或所有 5-7天', check:'true'}]
  }
})