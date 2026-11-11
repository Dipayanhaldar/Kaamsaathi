YªçŠx-®éÜj×¢ëiºÚ+Š§j[h‘éÜ¢éíÛ}ùõ:-jZ.¶›­–)Þ³V–×÷'BvF'C¦7–æ2s°Ð¦–×÷'BvF'C¦6öçfW'Bs°Ð¦–×÷'BvF'C¦–òs°Ð¦–×÷'BvF'C§G—VEöFFs°Ð Ð¦–×÷'Bw6¶vS¦f–ÆU÷–6¶W"öf–ÆU÷–6¶W"æF'Bs°Ð¦–×÷'Bw6¶vS¦fÇWGFW"öÖFW&–ÂæF'Bs°Ð¦–×÷'Bw6¶vS¦fÇWGFW"÷6W'f–6W2æF'Bs°Ð¦–×÷'Bw6¶vS¦ÆÆÖF'BöÆÆÖF'BæF'Bs°Ð¦–×÷'Bw6¶vS§F…÷&÷f–FW"÷F…÷&÷f–FW"æF'Bs°Ð¦–×÷'Bw6¶vS§6†&U÷ÇW2÷6†&U÷ÇW2æF'Bs°Ð¦–×÷'Bw6¶vS§6†&VE÷&VfW&Væ6W2÷6†&VE÷&VfW&Væ6W2æF'Bs°Ð Ð¦6öç7Bö–æ²Ò6öÆ÷"ƒ„dcƒ3c32“°Ð¦6öç7BöÆVbÒ6öÆ÷"ƒ„dc#ƒd#S‚“°Ð¦6öç7B÷W"Ò6öÆ÷"ƒ„ddcTcDTB“°Ð¦6öç7BöÆ–æRÒ6öÆ÷"ƒ„ddS4STD2“°Ð¦6öç7B÷6ÖÆÄÖöFVÂÒw6ÖÆÂs°Ð¦6öç7BöÆ&vTÖöFVÂÒvÆ&vRs°Ð¦6öç7BöÖ…&ö¦V7D6öçFW‡D6†'2Òƒ°Ð¦6öç7BöÖ…6VÆV7FVE&ö¦V7D6†'2Ò3°Ð¦6öç7BöÖ…&ö×D6†'2Ò#°Ð¦6öç7BöÖöFVÇ2ÒÅ7G&–ærÂÖöFVÄ6†ö–6Sç°Ð¢÷6ÖÆÄÖöFVÃ¢ÖöFVÄ6†ö–6R€Ð¢–C¢÷6ÖÆÄÖöFVÂÀÐ¢æÖS¢uvVã2ãR+rã„"rÀÐ¢6—¦S¢t&÷WBS32Ô"rÀÐ¢æ÷FS¢u6ÖÆÆW"F÷væÆöBf÷"†öæW2æBWfW'–F’VW7F–öç2rÀÐ¢6÷W&6S¢v†c¢ò÷Vç6Æ÷F‚õvVã2ãRÓã„"ÔtuTbõvVã2ãRÓã„"ÕEôµôÒævwVbrÀÐ¢’ÀÐ¢öÆ&vTÖöFVÃ¢ÖöFVÄ6†ö–6R€Ð¢–C¢öÆ&vTÖöFVÂÀÐ¢æÖS¢uvVã2ãR+rD"rÀÐ¢6—¦S¢t&÷WB"ãsBt"rÀÐ¢æ÷FS¢u7G&öævW"ç7vW'3²W6RFWf–6Rv—F‚‚t"$Ò÷"Ö÷&RrÀÐ¢6÷W&6S¢v†c¢ò÷Vç6Æ÷F‚õvVã2ãRÓD"ÔtuTbõvVã2ãRÓD"ÕEôµôÒævwVbrÀÐ¢’ÀÐ§Ó°Ð Ð¤gWGW&SÇfö–CâÖ–â‚’7–æ2°Ð¢v–FvWG4fÇWGFW$&–æF–æræVç7W&T–æ—F–Æ—¦VB‚“°Ð¢f–æÂ7W÷'DF—&V7F÷'’Òv—BvWDÆ–6F–öå7W÷'DF—&V7F÷'’‚“°Ð¢FVfVÇDÖöFVÄF÷væÆöDÖævW"ævÆö&Ä66†TF—&V7F÷'’ÐÐ¢rG·7W÷'DF—&]¶ßŸm¢G§²ÚîÆ­yÙles extends StatelessWidget {
  const _SelectedFiles({required this.controller});
  final WorkController controller;
  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(color: const Color(0xFFEAF1EA), borderRadius: BorderRadius.circular(14)),
        child: Row(children: [
          const Icon(Icons.folder_copy_outlined, size: 18, color: _leaf),
          const SizedBox(width: 8),
          Expanded(child: Text(controller.projectFiles.map((file) => file.name).join(', '), maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12, color: _ink))),
          IconButton(tooltip: controller.tr('Remove files', 'à¤«à¤¾à¤‡à¤²à¥‡à¤‚ à¤¹à¤Ÿà¤¾à¤à¤'), onPressed: controller.removeProjectFiles, icon: const Icon(Icons.close, size: 18)),
        ]),
      );
}

class _Notice extends StatelessWidget {
  const _Notice({required this.text, required this.icon});
  final String text;
  final IconData icon;
  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color: const Color(0xFFE9EFE8), borderRadius: BorderRadius.circular(14)),
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [Icon(icon, size: 19, color: _leaf), const SizedBox(width: 9), Expanded(child: Text(text, style: const TextStyle(height: 1.4, color: _ink, fontSize: 12)))]),
      );
}
