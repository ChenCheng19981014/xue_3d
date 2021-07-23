<template>
    <div
            class="navs tac"
            id="hoverNavs"
            :class="{ hover: hover, navIntroduce: navIntroduce }"
            @mouseenter="hover = true"
    >
        <div class="main-navs" v-show="!subNavs.length">
            <div
                    class="main-nav"
                    :class="{ active: item.url == activeNav }"
                    v-for="item in navs"
                    @click="openSub(item.url)"
                    :key="item.url"
            >
                {{item.name}}
            </div>
            <i class="active-icon" v-show="mainIndex>-1" :style="{left:`${190+557*mainIndex}px`}"></i>
        </div>
        <div class="sub-navs" v-show="subNavs.length">
            <div class="sub-nav"
                 :class="{ active:subIndex>-1&&item.owner == owner,disabled:!item.owner }"
                 v-for="item in subNavs"
                 :key="item.name"
                 @click="clickSub(item.owner)"
            >
                {{item.name}}
            </div>
            <i class="active-icon" v-show="subIndex>-1" :style="{left:`${160+350*subIndex}px`}"></i>
            <i class="back iconfont icon-shangsheng" @click="path=''"></i>
        </div>
    </div>
</template>
<script>
	import {mapGetters, mapActions} from "vuex";
	import $ from "jquery";

	export default {
		data() {
			return {
				navs: [
					{
						name: "集团",
						url: "/xs",
					},
					{
						name: "子公司",
						url: "/hx",
						children: [
							{
								name: '华星',
								owner: 'huaxing',
							},
							{
								name: '无锡机床',
								owner: 'wuxijichuang',
							},
							{
								name: '贝宁',
								owner: '',
							},
							{
								name: '贝奥',
								owner: '',
							},
							{
								name: '贝安',
								owner: '',
							},
							{
								name: '新苏',
								owner: '',
							}
						],
					},
					{
						name: "车间",
						url: "/productionLine",
						children: [
							{
								name: '华星',
								owner: 'huaxing',
							},
							{
								name: '无锡机床',
								owner: 'wuxijichuang',
							},
							{
								name: '贝宁',
								owner: '',
							},
							{
								name: '贝奥',
								owner: '',
							},
							{
								name: '贝安',
								owner: '',
							},
							{
								name: '新苏',
								owner: '',
							}
						],
					},
				],
				path: '',
				hover: false,
				navIntroduce: false,
				owner: ""
			};
		},
		computed: {
			...mapGetters(["activeNav"]),
			name() {
				if (this.owner === 'huaxing') {
					return '华星车间'
				} else if (this.owner === 'wuxijichuang') {
					return '无锡机床车间'
				} else {
					return '车间'
				}
			},
			mainIndex() {
				return this.navs.findIndex(item => item.url === this.activeNav);
			},
			subNavs() {
				const nav = this.navs.find(item => item.url === this.path);
				return (nav && nav.children) || []
			},
			subIndex() {
				return this.path===this.activeNav?this.subNavs.findIndex(item => item.owner === this.owner):-1
			}
		},

		methods: {
			openSub(url) {
				this.path = url;
				if (url === '/xs') {
					this.clickNav()
				}
			},
			clickSub(owner) {
				if (owner) {
					this.owner = owner;
					this.clickNav()
				}
			},
			clickNav() {
				setTimeout(() => {
					this.$store
					.dispatch("nav/activeNav", this.path)
					.then(() => {
						this.$router.push({
							path: this.path,
							query: {owner: this.owner}
						});
					})
					.catch(() => {
					});
				}, 200);
			},
			getCompany() {
				let routePath = this.$route.path
				if (routePath === "/deviceDetails") {
					this.owner = "wuxijichuang"
				} else {
					this.owner = "huaxing"
				}
			},

			mouseLeave(el) {
				let w = document.body.offsetWidth;
				let h = document.body.offsetHeight;
				var that = this;
				const rate = this.hover ? 0.1 : 0.02;
				if (
					el.clientX < w * 0.29 ||
					el.clientX > w * 0.71 ||
					el.clientY > h * rate
				) {
					$("#hoverNavs").slideUp(300, function () {
						that.hover = false;
					});
				} else {
					$("#hoverNavs").slideDown(300);
				}

			},
		},
		created() {
			this.$store.dispatch("nav/activeNav", this.$route.path);
			this.path = this.$route.path;
			if (this.$route.path == "/introduce") {
				this.navIntroduce = true;
			}
		},
		mounted() {
			window.addEventListener("mousemove", this.mouseLeave);
			const owner = this.$route.query.owner;
			if (owner) {
				this.owner = owner
			} else {
				this.getCompany()
			}
		},
		beforeDestroy() {
			window.removeEventListener("mousemove", this.mouseLeave);
		},
		watch: {
			activeNav(value) {
				if (value == "/introduce") {
					this.navIntroduce = true;
				} else {
					this.navIntroduce = false;
				}
			},
			'$route.query.owner'(val) {
				if (val) {
					this.owner = val
				} else {
					this.getCompany()
				}
			},
			hover() {
				this.path = this.activeNav;
			}
		},
	};
</script>
<style lang="less" scpoped>
    .navs {
        position: absolute;
        width: 3189px;
        height: 309px;
        cursor: pointer;
        margin-left: 2246px;
        z-index: 99999;

        &.hover {
            background-image: url("/static/images/xinsu/topbg.png");
            background-position: center;
            background-size: 100%;
            animation: go 0.3s 0s 1; /*声明动画*/
            /*定义动画*/
            @keyframes go {
                from {
                    /*0%*/
                    transform: translateY(-100px);
                }
                to {
                    /*100%*/
                    transform: translateY(0px);
                }
            }
        }

        &.navIntroduce {
            padding-top: 36px;
        }

        .active-icon {
            width: 122px;
            height: 77px;
            background: url("../../../static/images/xinsu/sanjiao.png") center no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: -97px;
            transform: translateX(-50%);
        }

        .main-navs {
            position: absolute;
            left: 50%;
            top: 39px;
            width: 1495px;
            height: 142px;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-between;
            transform: translateX(-50%);

            .main-nav {
                width: 380px;
                height: 142px;
                background: url("../../../static/images/xinsu/nav_l.png") center no-repeat;
                background-size: 360px 120px;
                text-align: center;
                font-size: 60px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 142px;
                cursor: pointer;
                &.active {
                    background-image: url("../../../static/images/xinsu/nav_l_active.png");
                    background-size: 100% 100%;
                }

                &:hover {
                    background-image: url("../../../static/images/xinsu/nav_l_active.png");
                    background-size: 100% 100%;
                }
            }

        }

        .sub-navs {
            position: absolute;
            left: 50%;
            top: 39px;
            width: 2070px;
            height: 142px;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-between;
            transform: translateX(-50%);

            .sub-nav {
                width: 320px;
                height: 142px;
                background: url("../../../static/images/xinsu/nav_s.png") center no-repeat;
                background-size: 300px 120px;
                text-align: center;
                font-size: 60px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 142px;
                cursor: pointer;
                &.active {
                    background-image: url("../../../static/images/xinsu/nav_s_active.png");
                    background-size: 100% 100%;
                }
                &:hover{
                    background-image: url("../../../static/images/xinsu/nav_s_active.png");
                    background-size: 100% 100%;
                }
                &.disabled{
                    cursor: not-allowed;
                }
            }
        }
        .back{
            font-size: 60px;
            line-height: 142px;
            transform: rotateZ(-90deg);
            color: #1FCBFF;
            position: absolute;
            top: 0;
            right: -140px;
        }
    }


</style>
