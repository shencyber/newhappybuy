// CategoryComponent.js - 纯展示组件
Vue.component('category-component', {
  template: `
    <div class="categories-container">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading">加载中...</div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error">
        {{ error }}
        <button @click="$emit('retry')" class="retry-btn">重试</button>
      </div>
      
      <!-- 正常状态 -->
      <div 
        v-else
        v-for="category in categoriesLink" 
        :key="category.id" 
        class="category-card"
        @click="navigateToCategory(category.href)"
      >
        <div class="category-icon">{{ category.icon_unicode || '📁' }}</div>
        <div class="category-name">{{ category.name }}</div>
      </div>
    </div>
  `,
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  data(){
    return {
      cnfansref:""
    }
  },
  computed:{
    

      categoriesLink(){
        
        this.categories.forEach(item=>{
            if (this.cnfansref)
            {
              item.href = `./all.html?categoryId=${item.id}&categoryName=${encodeURIComponent(item.name)}&cnfansref=${this.cnfansref}`
                console.log(item.href)
            }
            else  
              item.href = `./all.html?categoryId=${item.id}&categoryName=${encodeURIComponent(item.name)}`
        })
        
        return this.categories
        
      }
  },
  mounted() {

    const urlParams = new URLSearchParams(window.location.search);
    this.cnfansref = urlParams.get('cnfansref');


    console.log('CategoryComponent 已挂载');
    this.injectStyles();
  },
  methods: {
    // 跳转到分类页面
    navigateToCategory(href ) {
      window.location.href = href;
      
    },
    
    injectStyles() {
      const styleId = 'category-component-simple-grid';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          /* 分类容器 - 全宽度 */
          .categories-container {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 0;
            width: 100%;
            background: white;
          }
          
          /* 分类卡片 */
          .category-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 15px 5px;
            transition: all 0.3s ease;
            cursor: pointer;
            min-height: 80px;
            box-sizing: border-box;
            border: 1px solid transparent;
          }
          
          .category-card:nth-child(6n) {
            border-right: none;
          }
          
          .category-card:nth-last-child(-n+6) {
            border-bottom: none;
          }
          
          // .category-card:hover {
          //   background: #e9ecef;
          //   transform: translateY(-2px);
          //   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          //   border-color: #ddd;
          // }
          
          .category-icon {
            font-size: 24px;
            margin-bottom: 8px;
          }
          
          .category-name {
            font-size: 12px;
            font-weight: 500;
            color: #333;
            text-align: center;
            line-height: 1.2;
          }
          
          .loading, .error {
            grid-column: 1 / -1;
            text-align: center;
            padding: 40px 20px;
            color: #666;
          }
          
          .error {
            color: #f56c6c;
          }
          
          .retry-btn {
            margin-top: 10px;
            padding: 8px 16px;
            background: #409eff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .retry-btn:hover {
            background: #66b1ff;
          }
          
          /* 确保点击区域友好 */
          .category-card {
            -webkit-tap-highlight-color: transparent;
            user-select: none;
          }
          
          @media (max-width: 768px) {
            .category-card {
              padding: 12px 3px;
              min-height: 70px;
            }
            
            .category-icon {
              font-size: 20px;
              margin-bottom: 6px;
            }
            
            .category-name {
              font-size: 11px;
            }
          }
          
          @media (max-width: 480px) {
            .category-card {
              padding: 10px 2px;
              min-height: 65px;
            }
            
            .category-icon {
              font-size: 18px;
              margin-bottom: 4px;
            }
            
            .category-name {
              font-size: 10px;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }
});