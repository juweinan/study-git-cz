## git hooks 学习

安装 eslint，配置 eslint 文件，编写一些不符合规范的代码

项目根目录创建 .customGitHooks 文件夹

```sh
git config 'core.hooksPath' .customGitHooks
```

上面的命令是设置 githook 的存放目录，然后运行下面命令

```sh
git add .
git commit -m "test"
```

正常情况下，此次提交是会失败的，因为 eslint 检查没有通过
但是在 mac 设备上面，提交依然会正常进行，
并且给到警告提示，`hint: The '.customGitHooks/pre-commit' hook was ignored because it's not set as executable.` 这是因为该文件夹没有被设置为可执行文件，需要在控制台执行下面代码：

```sh
chmod 777 .customGitHooks/*
```

这时再做提交就能进行代码检查了。但是这么做有个缺点，就是别人每次拉代码的时候，如果也想要使用 commit eslint，那就需要修改 gitHooks 的存放目录。

## husky

由于 .git 文件夹不会被跟踪并且上传到远程仓库，所以就出现了 `husky` 来解决这一问题

```sh
npm install husky -D
```

在 package.json 中配置脚本命令 `"prepare": "husky install"`

执行这个命令，主要做以下事情：

1. 创建 .husky 文件夹
2. 复制 `../husky.sh` 文件到该目录下
3. 执行 `core.hooksPath` 讲 husky 设置为 gitHooks 目录

创建 pre-commit 文件，添加代码。。。

这时再提交代码（mac 同样需要执行 chmod 777 .husky/\* 来设置文件权限），就会提示 eslint 语法错误提交失败。

> 现在 .git 无法被跟踪以及提交的问题解决了，剩下的就是如何编写 hooks 文件了

## lint-staged

对 git 暂存区的代码文件进行 bash 命令操作

```sh
npm install lint-staged -D
```

根目录下创建 `.lintstagedrc` 文件

```js
{
  "*.js": [
    "eslint --fix", // 对于 js 文件使用 eslint 进行代码检查，并对于不合规的代码进行修复
    "git add" // 修复之后的代码自动执行 git add，这样就不用在重新添加提交了
  ]
}
```

修改 husky 目录下的 pre-commit

```
. "$(dirname "$0")/_/husky.sh"
npm run lint
```

第一句话应该是找到并执行 当前文件夹下的 `\_/husky.sh` 文件，然后运行 npm run lint

在 package.json 文件中添加脚本命令

```json
"lint": "lint-staged"
```

这是再执行 commit，就会在控制台中看到，会通过 lint-staged 使用 eslint 进行代码检查并修复，然后修复成功后直接提交正确规范的代码

如今，提交到 git 中的代码规范已经有了，现在也需要规范一下提交信息了

## commitlint

