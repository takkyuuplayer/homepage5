// homepage4.0 の web/src/pages/welcome.tsx にあった serverHistory を移植し、
// 末尾に homepage5 が動いている Cloudflare Workers を足したもの。
// 移植元に利用期間の記録は無く、ここでも持たない。一部にだけ年を付けると、
// 付いていないものが「不明」なのか「省略」なのか読者に伝わらないため。

// 終了したサービスについて、いつ終わったかと、それを説明するページ。
// 公式告知 > そのサービス単独の記事 > 一覧記事の順で、実際に終了を述べている
// ページを選ぶ。
export type Closure = {
	url: string;
	year: number;
};

export type Host = {
	// 移植元は "Yahoo" "Infoseek" と書いていたが、終了したのは Yahoo! JAPAN の
	// ジオシティーズと楽天の infoseek isweb で、Yahoo や Infoseek 自体ではない。
	// 「サービス終了」と添える以上、終了したサービスの名前で書く。
	name: string;
	// 終了したサービスも、当時どこに置いていたかの記録として url を残す。
	// 表示側は closed のものでは url ではなく closed.url にリンクする。
	url: string;
	// 現役のホストは closed を持たない。false を書かせず、「現役」の表し方を 1 つにする。
	closed?: Closure;
};

// 古い順。移転の順番そのものが内容なので、表示側は <ol> で出す。
//
// 生きているものの url は、移植元の URL からの転送先に置き換えている
// （awslabs/ → aws/、http → https、workers.cloudflare.com → 製品ページ）。
export const hosts: readonly Host[] = [
	{
		name: "Yahoo!ジオシティーズ",
		url: "http://www.geocities.jp/takkyuuplayer/",
		// 2019 年 3 月末に終了。旧 URL は Yahoo の終了告知へ転送されるが、告知の
		// ページ自体が開けないので Wikipedia の記事に飛ばす。
		closed: {
			url: "https://ja.wikipedia.org/wiki/ジオシティーズ",
			year: 2019,
		},
	},
	{
		name: "infoseek isweb",
		url: "http://takkyuuplayer.hp.infoseek.co.jp/",
		// 使っていた無料の isweb ライトは 2010 年 10 月末に終了。有料の isweb
		// ベーシックは 2012 年まで続いたが、こちらは使っていない。
		closed: {
			url: "https://ja.wikipedia.org/wiki/Infoseek_isweb",
			year: 2010,
		},
	},
	{
		name: "land.to",
		url: "http://takkyuuplayer.ps.land.to/",
		// 2026 年 3 月 31 日に終了し FC2 に一本化。旧 URL も終了告知を表示するが、
		// 運営元 FC2 の告知記事に飛ばす。
		closed: {
			url: "https://fc2information.blog.fc2.com/blog-entry-2322.html",
			year: 2026,
		},
	},
	{
		name: "@PAGES",
		url: "http://www21.atpages.jp/takkyuuplayer/",
		// 単独の記事も公式告知も見つからず、Wikipedia の一覧記事にある
		// 「@PAGES（有限会社アットフリークス）（2018年）」の記載だけが根拠。
		closed: {
			url: "https://ja.wikipedia.org/wiki/ホスティングサーバ#終了した日本の主なホスティングサービス",
			year: 2018,
		},
	},
	{
		name: "000webhost",
		url: "http://takkyuuplayer.netau.net/",
		// 運営元 Hostinger が 2024 年に終了。日本語の記事が無く、公式告知も
		// 残っていないため、同業 InfinityFree のフォーラムの解説記事に飛ばす。
		closed: {
			url: "https://forum.infinityfree.com/t/000webhost-shutting-down-what-it-means-for-free-hosting/97238",
			year: 2024,
		},
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
