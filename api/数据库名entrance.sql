/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50547
 Source Host           : localhost:3306
 Source Schema         : entrance

 Target Server Type    : MySQL
 Target Server Version : 50547
 File Encoding         : 65001

 Date: 07/02/2021 16:47:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resid` int(11) NOT NULL,
  `in` int(1) NOT NULL DEFAULT 0,
  `door` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `temperature` decimal(3, 1) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `guardid` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '小区居民进出数据' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log
-- ----------------------------
-- INSERT INTO `log` VALUES (1, 5, 0, '北1门', 36.2, '2021-02-06', '12:20:18', 2);
-- INSERT INTO `log` VALUES (2, 5, 1, '北1门', 36.3, '2021-02-06', '15:33:02', 2);
-- INSERT INTO `log` VALUES (3, 7, 0, '南门', 37.1, '2021-02-06', '16:36:53', 2);
-- INSERT INTO `log` VALUES (4, 6, 0, '南门', 36.6, '2021-02-06', '20:42:42', 2);
-- INSERT INTO `log` VALUES (5, 8, 1, '北1门', 36.4, '2021-02-06', '20:43:12', 1);
-- INSERT INTO `log` VALUES (6, 2, 1, '南门', 36.4, '2021-02-06', '20:44:22', 2);
-- INSERT INTO `log` VALUES (7, 3, 0, '北1门', 37.2, '2021-02-06', '20:45:02', 1);
-- INSERT INTO `log` VALUES (8, 2, 1, '北1门', 36.2, '2021-02-06', '15:05:00', 1);
-- INSERT INTO `log` VALUES (9, 5, 1, '南门', 36.6, '2021-02-06', '15:08:55', 1);
-- INSERT INTO `log` VALUES (10, 8, 1, '南门', 36.5, '2021-02-06', '15:11:00', 1);
-- INSERT INTO `log` VALUES (11, 11, 1, '南门', 36.4, '2021-02-07', '16:19:01', 1);
-- INSERT INTO `log` VALUES (12, 8, 0, '南门', 35.9, '2021-02-07', '16:25:04', 1);
-- INSERT INTO `log` VALUES (13, 13, 0, '北1门', 37.2, '2021-02-07', '16:45:34', 1);

-- ----------------------------
-- Table structure for residents
-- ----------------------------
DROP TABLE IF EXISTS `residents`;
CREATE TABLE `residents`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `building` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `unit` int(11) NOT NULL,
  `room` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '小区居民业主信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of residents
-- ----------------------------
-- INSERT INTO `residents` VALUES (1, '张三', '1', '15275154425', '2', 4, 503);
-- INSERT INTO `residents` VALUES (2, '韩梅梅', '0', '13544513365', '2', 1, 202);
-- INSERT INTO `residents` VALUES (3, '小刚', '1', '13944551154', '5', 2, 702);
-- INSERT INTO `residents` VALUES (4, '李四', '1', '15815446532', '5', 2, 402);
-- INSERT INTO `residents` VALUES (5, '王五', '1', '15899553155', '5', 1, 207);
-- INSERT INTO `residents` VALUES (6, '刘备', '1', '15899453321', '3', 2, 205);
-- INSERT INTO `residents` VALUES (7, '小乔', '0', '15845221365', '3', 1, 502);
-- INSERT INTO `residents` VALUES (8, '大乔', '0', '15845115487', '3', 1, 401);
-- INSERT INTO `residents` VALUES (9, '孙尚香', '0', '15244557896', '3', 1, 405);
-- INSERT INTO `residents` VALUES (10, '李逵', '1', '15245221547', '3', 2, 203);
-- INSERT INTO `residents` VALUES (11, '武则天', '0', '13455221157', '1', 2, 203);
-- INSERT INTO `residents` VALUES (12, '关羽', '1', '15244887714', '1', 1, 101);
-- INSERT INTO `residents` VALUES (13, '马冬梅', '0', '17735644452', '2', 4, 602);

-- ----------------------------
-- Table structure for strangelog
-- ----------------------------
DROP TABLE IF EXISTS `strangelog`;
CREATE TABLE `strangelog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `resid` int(11) NOT NULL,
  `temperature` decimal(3, 1) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `guard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '外来人员进出数据' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of strangelog
-- ----------------------------
-- INSERT INTO `strangelog` VALUES (1, '外卖员A', '13845112245', 5, 36.5, '00:00:00', '2021-02-06', '2');
-- INSERT INTO `strangelog` VALUES (2, '外卖员C', '13421151124', 3, 36.4, '15:36:07', '2021-02-06', '2');
-- INSERT INTO `strangelog` VALUES (3, '张大彪', '15477458754', 6, 36.2, '15:38:07', '2021-02-06', '1');
-- INSERT INTO `strangelog` VALUES (4, '外卖员D', '13811245578', 8, 36.5, '20:46:46', '2021-02-06', '2');
-- INSERT INTO `strangelog` VALUES (5, '快递员A', '13465497854', 12, 36.7, '16:23:46', '2021-02-07', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `passwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '门卫人员数据' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
-- INSERT INTO `user` VALUES (1, 'admin', 'JfnnlDI7RTiF9RgfG2JNCw==', '15271110028', '管理员');
-- INSERT INTO `user` VALUES (2, 'test', 'JfnnlDI7RTiF9RgfG2JNCw==', '15866445524', '测试用户');
-- INSERT INTO `user` VALUES (3, 'menweione', 'JfnnlDI7RTiF9RgfG2JNCw==', '15944551245', '门卫一');
-- INSERT INTO `user` VALUES (4, 'menweitwo', 'JfnnlDI7RTiF9RgfG2JNCw==', '13454665874', '门卫二');
-- INSERT INTO `user` VALUES (5, 'menweithree', 'AMNZ/2LtfB4CppAH0gr76A==', '15055125467', '门卫三');
-- INSERT INTO `user` VALUES (6, 'menweifour', '4QrcOUm6Wau+VuBX8g+IPg==', '13945121110', '门卫四');

SET FOREIGN_KEY_CHECKS = 1;
