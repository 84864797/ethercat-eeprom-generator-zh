describe("backup", function() {
  
  beforeEach(function() {
  });

  it("should return false for button control", function() {
    // arrange
    const control = { type: 'button' };
    // act
    var result = isBackedUp(control);
    // assert
    expect(result).toEqual(false);
    });

  it("restores both checked and unchecked CoE controls", function() {
    const form = buildMockFormHelper();
    const pdoAssign = form.CoeDetailsEnablePDOAssign;
    const sdoInfo = form.CoeDetailsEnableSDOInfo;
    pdoAssign.checked = true;
    sdoInfo.checked = false;

    const backup = JSON.parse(prepareBackupFileContent(form));
    expect(backup.form[pdoAssign.name]).toBe(true);
    expect(backup.form[sdoInfo.name]).toBe(false);
    const restored = buildMockFormHelper();
    setFormValues(restored, backup);
    expect(restored.CoeDetailsEnablePDOAssign.checked).toBe(true);
    expect(restored.CoeDetailsEnableSDOInfo.checked).toBe(false);
  });

  it("uses the default for legacy checkbox strings", function() {
    const form = buildMockFormHelper();
    const control = form.CoeDetailsEnablePDOAssign;
    control.checked = true;
    setFormValues(form, { form: { [control.name]: 'EnablePDOAssign' } });
    expect(control.checked).toBe(false);
  });
});
