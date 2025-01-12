@@ .. @@
   const [activeTab, setActiveTab] = useState('mortgage');
   const [isFullscreen, setIsFullscreen] = useState(false);
   const { user } = useAuth();
-  const [showAuthModal, setShowAuthModal] = useState(false);
+  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
 
   const handleAuthClick = () => {
-    setShowAuthModal(true);
+    setIsAuthModalOpen(true);
   };
   
   // Mortgage Calculator State
@@ .. @@
   });
 
   // Style for input fields with better contrast
-  const inputStyle = "bg-navy-900 border-gold-500/20 text-white placeholder:text-gray-500";
-  const buttonStyle = "bg-gold-500 text-navy-950 hover:bg-gold-600 font-medium";
-  const labelStyle = "text-gray-300";
+  const inputStyle = "bg-black-900 border-gold-500/20 text-white placeholder:text-gray-400";
+  const buttonStyle = "w-full bg-gold-500 text-black-950 hover:bg-gold-600 font-medium";
+  const labelStyle = "text-white mb-2 block";
 
   // BTL Calculator State
@@ .. @@
                   <div className="p-6 space-y-4">
                     <div>
-                      <Label>Property Price</Label>
+                      <Label className={labelStyle}>Property Price</Label>
                       <Input
                         type="number"
                         placeholder="Enter property price"
@@ -                      className={inputStyle}
                       />
                     </div>
                     <div>
-                      <Label>Deposit</Label>
+                      <Label className={labelStyle}>Deposit</Label>
                       <Input
                         type="number"
                         placeholder="Enter deposit amount"
@@ -                      className={inputStyle}
                       />
                     </div>
                     <div>
-                      <Label>Interest Rate (%)</Label>
+                      <Label className={labelStyle}>Interest Rate (%)</Label>
                       <Input
                         type="number"
                         step="0.1"
@@ -                      className={inputStyle}
                       />
                     </div>
                     <div>
-                      <Label>Term (years)</Label>
+                      <Label className={labelStyle}>Term (years)</Label>
                       <Input
                         type="number"
                         placeholder="Enter term in years"
@@ -                      className={inputStyle}
                       />
                     </div>
-                    <Button type="submit" className={buttonStyle}>
+                    <Button type="submit" className={buttonStyle} onClick={() => {
+                      // Calculate mortgage
+                    }}>
                       Calculate
                     </Button>
                   </div>
@@ .. @@
                   <div className="p-6 space-y-4">
                     <div>
-                      <Label>Property Price</Label>
+                      <Label className={labelStyle}>Property Price</Label>
                       <Input
                         type="number"
+                        placeholder="Enter property price"
                         value={btlParams.propertyPrice}
                         onChange={(e) => setBtlParams(prev => ({
                           ...prev,
                           propertyPrice: parseFloat(e.target.value)
                         }))}
-                        className="bg-navy-800 border-gold-500/20"
+                        className={inputStyle}
                       />
                     </div>
                     <div>
-                      <Label>Monthly Rent</Label>
+                      <Label className={labelStyle}>Monthly Rent</Label>
                       <Input
                         type="number"
+                        placeholder="Enter monthly rent"
                         value={btlParams.monthlyRent}
                         onChange={(e) => setBtlParams(prev => ({
                           ...prev,
                           monthlyRent: parseFloat(e.target.value)
                         }))}
-                        className="bg-navy-800 border-gold-500/20"
+                        className={inputStyle}
                       />
                     </div>
                     <div>
-                      <Label>Management Fee (%)</Label>
+                      <Label className={labelStyle}>Management Fee (%)</Label>
                       <Input
                         type="number"
+                        placeholder="Enter management fee"
                         value={btlParams.managementFee}
                         onChange={(e) => setBtlParams(prev => ({
                           ...prev,
                           managementFee: parseFloat(e.target.value)
                         }))}
-                        className="bg-navy-800 border-gold-500/20"
+                        className={inputStyle}
                       />
                     </div>
+                    <Button type="submit" className={buttonStyle} onClick={() => {
+                      // Calculate BTL returns
+                    }}>
+                      Calculate Returns
+                    </Button>
                   </div>
                 </MarketWidget>
