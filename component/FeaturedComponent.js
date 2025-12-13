Vue.component('featured-component', {
  props: {
    type: {
      type: String,
      default: 'hot',
      validator: value => ['hot', 'best', 'new'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    weidianId: {
      type: String,
      default: ''
    },
    colors: {
      type: Array,
      default: () => []
    },
    selectedColor: {
      type: String,
      default: ''
    }
  },
  template: `
    <div :class="['featured-card-wrapper', typeClass]">
      <div :class="['featured-label', type]">
        {{ typeLabel }}
      </div>

      <div class="featured-image-wrapper">
        <img :src="currentImage" class="featured-image" :alt="title">
      </div>

      <div v-if="colors && colors.length > 0" class="color-selector">
        <div class="color-options-scroll">
          <div
            v-for="(color, index) in colors"
            :key="color.name + '-' + index"
            class="color-item"
            :class="{ active: currentSelectedColor === color.name }"
            @click="selectColor(color)"
          >
            {{ color.name }}
          </div>
        </div>
      </div>

      <div class="featured-info">
        <div class="featured-title">{{ title }}</div>
        <div class="featured-price"> <label>$</label> {{ price }}</div>
        <a :href="href" class="featured-button">View Details</a>
      </div>
    </div>
  `,
  data() {
    return {
      currentSelectedColor: this.selectedColor,
      cnfansref: ''  // 从 URL 动态获取
    };
  },
  computed: {
    typeClass() {
      return `featured-${this.type}`;
    },
    typeLabel() {
      const labels = {
        hot: 'Hot',
        best: 'Best',
        new: 'New'
      };
      return labels[this.type] || this.type;
    },
    currentImage() {
      if (!this.colors || this.colors.length === 0) return '';
      const colorObj = this.colors.find(c => c.name === this.currentSelectedColor);
      return colorObj ? colorObj.url : this.colors[0].url;
    },
    
    href() {
      let url = `./detail.html?weidian_id=${this.weidianId}`;
      if (this.cnfansref)  url += `&cnfansref=${this.cnfansref}`;
      return url;
    }
  },
  methods: {
    selectColor(color) {
      this.currentSelectedColor = color.name;
    },
    injectStyles() {
      if (document.getElementById('featured-component-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'featured-component-styles';
      style.textContent = `
        .featured-card-wrapper {
          position: relative;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          width: 90%;
          max-width: 360px;
          margin: 0 auto 20px auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .featured-card-wrapper .featured-label {
          position: absolute;
          top: 8px;
          left: 8px;
          color: #fff;
          font-weight: 700;
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 14px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.25);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          z-index: 2;
          text-transform: uppercase;
        }

        /* Hot 类型样式 - 红色系 */
        .featured-hot .featured-label.hot {
          background: linear-gradient(135deg, #FF4757 0%, #FF3838 100%);
        }

        /* Best 类型样式 - 金色系 */
        .featured-best .featured-label.best {
          background: linear-gradient(135deg, #F7D34B 0%, #F1C40F 100%);
        }

        /* New 类型样式 - 橙色系 */
        .featured-new .featured-label.new {
          background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
        }

        .featured-card-wrapper .featured-image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 85%;
          overflow: hidden;
        }
        .featured-card-wrapper .featured-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* 颜色选择器 */
        .featured-card-wrapper .color-selector {
          padding: 6px 12px;
          display: flex;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .featured-card-wrapper .color-options-scroll {
          display: flex;
          gap: 4px;
        }
        .featured-card-wrapper .color-item {
          cursor: pointer;
          padding: 2px 6px;
          font-size: 10px;
          color: #666;
          font-weight: 400;
          text-transform: uppercase;
          text-align: center;
          border-radius: 2px;
          border: 1px solid transparent;
          background: transparent;
          flex-shrink: 0;
          min-width: 24px;
          transition: all 0.2s ease;
          user-select: none;
        }
        .featured-card-wrapper .color-item.active {
          color: #409eff;
          font-weight: 600;
          background: rgba(64,158,255,0.1);
          border: 1px solid rgba(64,158,255,0.3);
        }

        .featured-card-wrapper .featured-info {
          padding: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .featured-card-wrapper .featured-title {
          font-size: 15px;
          font-weight: 600;
          color: #1c1c1c;
        }
        .featured-card-wrapper .featured-price {
          font-size: 17px;
          font-weight: 700;
          color: #333;
        }
        
        /* 按钮基础样式 */
        .featured-card-wrapper .featured-button {
          display: inline-block;
          padding: 8px 20px;
          color: #fff;
          font-weight: 600;
          font-size: 13px;
          border-radius: 12px;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        /* Hot 类型按钮样式 - 红色系 */
        .featured-hot .featured-button {
          background: linear-gradient(135deg, #FF6B6B 0%, #E53935 100%);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }
        .featured-hot .featured-button:hover {
          background: linear-gradient(135deg, #FF7E7E 0%, #FF5252 100%);
          box-shadow: 0 6px 16px rgba(255, 107, 107, 0.4);
          transform: translateY(-2px);
        }

        /* Best 类型按钮样式 - 金色系 */
        .featured-best .featured-button {
          background: linear-gradient(135deg, #F7D34B 0%, #F1C40F 100%);
          box-shadow: 0 4px 12px rgba(247, 211, 75, 0.3);
        }
        .featured-best .featured-button:hover {
          background: linear-gradient(135deg, #FBE45D 0%, #F6D515 100%);
          box-shadow: 0 6px 16px rgba(247, 211, 75, 0.4);
          transform: translateY(-2px);
        }

        /* New 类型按钮样式 - 橙色系 */
        .featured-new .featured-button {
          background: linear-gradient(135deg, #FFB74D 0%, #FF9800 100%);
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }
        .featured-new .featured-button:hover {
          background: linear-gradient(135deg, #FFCC80 0%, #FFB74D 100%);
          box-shadow: 0 6px 16px rgba(255, 152, 0, 0.4);
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(style);
    }
  },
  mounted() {
    // 从 URL 获取 cnfansref
    const urlParams = new URLSearchParams(window.location.search);
    this.cnfansref = urlParams.get('cnfansref');
    this.injectStyles();
  },
  watch: {
    selectedColor(newVal) {
      this.currentSelectedColor = newVal;
    }
  }
});