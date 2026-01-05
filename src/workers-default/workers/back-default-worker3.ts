interface Message {
  reqID: string;
  op: string;
  args: any[];
}

self.addEventListener('message', async ({ data }: { data: Message }) => {
  if (data.op in adapter.ops) {
    try {
      const res = await adapter.ops[data.op](...data.args);
      self.postMessage({
        reqID: data.reqID,
        status: 'ok',
        result: res,
      });
    } catch (err) {
      self.postMessage({
        reqID: data.reqID,
        status: 'err',
        result: err,
      });
    }
  } else {
    self.postMessage({
      status: 'err',
      reqID: data.reqID,
      result: 'method in service not exist:'+data.op,
    });
  }
});

const adapter = {
  ops: {},
  register(name: string, fn: (args: any) => any) {
    this.ops[name] = fn;
  },
};


function registerModule(module:any)
{
  for (const item in module) {
    adapter.register(item, module[item]);
  }
}

import modules from '../registerServiceModule.ts';
//注册
modules.forEach(itemModule=>
  registerModule(itemModule)
);

