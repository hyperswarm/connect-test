# @hyperswarm/connect-test

Create connections with peers in the 'connect-test' topic (Demo).

```
npx @hyperswarm/connect-test
```

You should see output like:

```
★   ★   ★   ★   ★   ★
  ★   ★   ★   ★   ★
Hyperswarm Connect-Test
  ★   ★   ★   ★   ★
★   ★   ★   ★   ★   ★

▶ Testing hole-punchability...
✔ Your network is hole-punchable

▶ Joining hyperswarm under the sha256('connect-test') topic
ℹ Waiting for connections...

› New connection!
› New connection!
› New connection!
```

That's all it does! It joins the hyperswarm under the 'connect-test' topic (hashed by sha256) and then arranges connections. The connections aren't used at all.