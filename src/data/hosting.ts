// homepage4.0 の web/src/pages/welcome.tsx にあった serverHistory を移植し、
// 末尾に homepage5 が動いている Cloudflare Workers を足したもの。
// 移植元に時期の記録は無く、ここでも持たない。一部にだけ年を付けると、
// 付いていないものが「不明」なのか「省略」なのか読者に伝わらないため。

export type Host = {
	name: string;
	// 終了したサービスも、当時どこに置いていたかの記録として url を残す。
	// 表示側は closed のものにリンクを張らない。
	url: string;
	// 現役のホストは closed を持たない。false を書かせず、「現役」の表し方を 1 つにする。
	closed?: true;
};

// 古い順。移転の順番そのものが内容なので、表示側は <ol> で出す。
//
// closed の根拠（2026-09 確認）:
// - Yahoo（ジオシティーズ）: URL が Yahoo の終了告知 info-geocities.yahoo.co.jp へ転送される
// - land.to: 200 を返すが、ページの title が「land.to サービス終了のお知らせ」
// - Infoseek, @PAGES, 000webhost: 旧ページに到達できない（DNS 解決不可または応答なし）。
//   サービスそのものの終了告知は確認していない
//
// 生きているものの url は、移植元の URL からの転送先に置き換えている
// （awslabs/ → aws/、http → https、workers.cloudflare.com → 製品ページ）。
export const hosts: readonly Host[] = [
	{
		name: "Yahoo",
		url: "http://www.geocities.jp/takkyuuplayer/",
		closed: true,
	},
	{
		name: "Infoseek",
		url: "http://takkyuuplayer.hp.infoseek.co.jp/",
		closed: true,
	},
	{
		name: "land.to",
		url: "http://takkyuuplayer.ps.land.to/",
		closed: true,
	},
	{
		name: "@PAGES",
		url: "http://www21.atpages.jp/takkyuuplayer/",
		closed: true,
	},
	{
		name: "000webhost",
		url: "http://takkyuuplayer.netau.net/",
		closed: true,
	},
	{
		name: "Amazon EC2",
		url: "https://aws.amazon.com/ec2/",
	},
	{
		name: "さくらVPS",
		url: "https://vps.sakura.ad.jp/",
	},
	{
		name: "Amazon SAM",
		url: "https://github.com/aws/serverless-application-model",
	},
	{
		name: "Cloudflare Workers",
		url: "https://www.cloudflare.com/products/workers/",
	},
];
